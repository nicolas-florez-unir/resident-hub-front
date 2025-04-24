export class UnknownException extends Error {
  constructor(message: string) {
    super('Unknown error');
    this.message = message;
  }
}
