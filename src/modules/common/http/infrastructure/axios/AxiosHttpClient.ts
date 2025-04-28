import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import { AxiosError } from 'axios';
import axios from 'axios';
import { HttpClient } from '../../domain/HttpClient';
import { applicationStorage } from 'src/boot/application-storage';
import { handleRefreshTokenFlow } from '../flows/refresh-access-token.flow';
import { HttpClientException } from '../../domain/exceptions/http-client.exception';
import { UnknownException } from 'src/modules/common/exceptions/unknown.exception';
import { ApiAuthEndpoints } from 'src/modules/auth/login/infrastructure/endpoints/api/auth.endpoints';

export class AxiosHttpClient extends HttpClient {
  private readonly instance: AxiosInstance = axios.create({
    baseURL: process.env.BASE_API_URL ?? '',
    timeout: 5000,
    withCredentials: true,
  });

  constructor() {
    super();
    this.instance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const original = error.config as AxiosRequestConfig & { _retry?: boolean };

        console.log(original);

        if (
          !this.shouldRetryRequest({
            error,
            url: original.url,
            isRetry: original._retry ?? false,
          })
        ) {
          return Promise.reject(error);
        }

        original._retry = true;

        const newAccessToken = await handleRefreshTokenFlow();

        if (!newAccessToken) return Promise.reject(error);

        original.headers = { ...original.headers, Authorization: `Bearer ${newAccessToken}` };
        return this.instance(original);
      },
    );
  }

  private shouldRetryRequest(params: {
    error: AxiosError;
    url: string | undefined;
    isRetry: boolean;
  }): boolean {
    // Si no hay URL o es un reintento, no se debe volver a intentar
    if (params.url === undefined || params.isRetry) return false;

    const ignoredEndpoints = [ApiAuthEndpoints.LOGIN, ApiAuthEndpoints.REFRESH_ACCESS_TOKEN];
    console.log(ignoredEndpoints);
    const isIgnoredEndpoint = ignoredEndpoints.some((endpoint) => params.url?.includes(endpoint));

    // Si la URL es una de las que no se deben volver a intentar, no se debe volver a intentar
    if (isIgnoredEndpoint) return false;

    // Se reintenta si el error es 401 y no es un reintento
    const isUnauthorized = params.error.response?.status === 401;
    return isUnauthorized;
  }

  async get<T>(url: string, params?: object): Promise<T> {
    const result = await this.instance.get<T>(url, {
      params,
      headers: {
        Authorization: `Bearer ${applicationStorage.getItem('accessToken')}`,
      },
    });
    return result.data;
  }

  async post<T>(
    url: string,
    body: object,
    config?: { headers: Record<string, string> },
  ): Promise<T> {
    try {
      const result = await this.instance.post<T>(url, body, {
        headers: {
          Authorization: `Bearer ${applicationStorage.getItem('accessToken')}`,
          ...config?.headers,
        },
      });
      return result.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpClientException(
          error.cause?.message ?? 'Error on Post Request',
          error.response?.status ?? 500,
        );
      }
      throw new UnknownException(`Error on Post Request`);
    }
  }

  async put<T>(url: string, body: object): Promise<T> {
    const result = await this.instance.put<T>(url, body, {
      headers: {
        Authorization: `Bearer ${applicationStorage.getItem('accessToken')}`,
      },
    });
    return result.data;
  }

  async delete<T>(url: string): Promise<T> {
    const result = await this.instance.delete<T>(url, {
      headers: {
        Authorization: `Bearer ${applicationStorage.getItem('accessToken')}`,
      },
    });
    return result.data;
  }
}
