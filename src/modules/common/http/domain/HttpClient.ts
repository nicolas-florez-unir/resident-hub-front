export enum HttpClientRequestConfigHeaders {
  'X-Internal-Refresh' = 'X-Internal-Refresh',
}

export interface HttpClientRequestConfig {
  headers: Record<HttpClientRequestConfigHeaders, string>;
}

export abstract class HttpClient {
  abstract get<T>(url: string, params?: object): Promise<T>;
  abstract post<T>(url: string, body: object, config?: HttpClientRequestConfig): Promise<T>;
  abstract put<T>(url: string, body: object): Promise<T>;
  abstract delete<T>(url: string): Promise<T>;
}
