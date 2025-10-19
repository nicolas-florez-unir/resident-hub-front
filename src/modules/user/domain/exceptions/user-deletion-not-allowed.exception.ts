export class UserDeletionNotAllowedException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UserDeletionNotAllowedException';
  }
}
