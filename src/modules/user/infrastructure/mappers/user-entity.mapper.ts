import type { UserDto } from '../../domain/dtos/user.dto';
import { UserEntity } from '../../domain/entities';
import { UserRoleMapper } from './user-role.mapper';

export class UserEntityMapper {
  static toEntity(dto: UserDto): UserEntity {
    return new UserEntity(
      dto.id,
      dto.email,
      dto.firstName,
      dto.lastName,
      dto.phone,
      UserRoleMapper.toEnum(dto.role),
    );
  }

  static toDto(entity: UserEntity): UserDto {
    return {
      id: entity.getId(),
      email: entity.getEmail(),
      firstName: entity.getFirstName(),
      lastName: entity.getLastName(),
      phone: entity.getPhone(),
      role: entity.getRole(),
    };
  }
}
