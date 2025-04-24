import { UserRole } from '../../domain/enums';

export class UserRoleMapper {
  static toEnum(role: string): UserRole {
    if (Object.values(UserRole).includes(role as UserRole)) {
      return role as UserRole;
    }
    throw Error(`Invalid UserRole cast: ${role}`);
  }

  static toString(role: UserRole): string {
    switch (role) {
      case UserRole.Administrator:
        return 'Administrador';
      case UserRole.HouseOwner:
        return 'Propietario';
      default:
        throw Error(`Cant convert role to string`);
    }
  }
}
