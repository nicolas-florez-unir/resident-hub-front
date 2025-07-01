export class CreateUserDto {
  constructor(
    public readonly email: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly phone: string,
    public readonly role: string,
    public readonly password: string,
  ) {}

  public getEmail(): string {
    return this.email;
  }

  public getFirstName(): string {
    return this.firstName;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public getPhone(): string {
    return this.phone;
  }

  public getRole(): string {
    return this.role;
  }

  public getPassword(): string {
    return this.password;
  }
}
