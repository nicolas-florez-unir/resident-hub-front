export abstract class HttpClient {
  abstract get<T>(url: string, params?: object): Promise<T>;
  abstract post<T>(
    url: string,
    body: object,
    config?: { headers: Record<string, string> },
  ): Promise<T>;
  abstract put<T>(url: string, body: object): Promise<T>;
  abstract patch<T>(url: string, body: object): Promise<T>;
  abstract delete<T>(url: string): Promise<T>;
}
