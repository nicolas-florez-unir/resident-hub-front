export class HttpClientException extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super('HttpClient error');
    this.message = message;
    this.statusCode = statusCode;
  }
}
