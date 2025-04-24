import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import { AxiosError } from 'axios';
import axios from 'axios';
import { HttpClient } from '../../domain/HttpClient';
import type { HttpClientRequestConfig } from '../../domain/HttpClient';
import { HttpClientRequestConfigHeaders } from '../../domain/HttpClient';
import { applicationStorage } from 'src/boot/application-storage';
import { handleRefreshTokenFlow } from '../flows/refresh-access-token.flow';
import { HttpClientException } from '../../domain/exceptions/http-client.exception';
import { UnknownException } from 'src/modules/common/exceptions/unknown.exception';

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
        const isUnauthorized = error.response?.status === 401;
        const isInternalRefresh =
          original.headers?.[HttpClientRequestConfigHeaders['X-Internal-Refresh']] === 'true';

        if (!isUnauthorized || original._retry || isInternalRefresh) return Promise.reject(error);

        original._retry = true;

        const newAccessToken = await handleRefreshTokenFlow();

        if (!newAccessToken) return Promise.reject(error);

        original.headers = { ...original.headers, Authorization: `Bearer ${newAccessToken}` };
        return this.instance(original);
      },
    );
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

  async post<T>(url: string, body: object, config?: HttpClientRequestConfig): Promise<T> {
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
