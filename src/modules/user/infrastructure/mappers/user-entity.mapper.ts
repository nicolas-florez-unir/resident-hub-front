import type { UserDto } from '../../domain/dtos/user.dto';
import type { UserUpdatedDto } from '../dtos/user-updated.dto';
import { UserEntity } from '../../domain/entities';
import { UserRoleMapper } from './user-role.mapper';


export class UserEntityMapper {
  static toEntity(dto: UserDto | UserUpdatedDto): UserEntity {
    return new UserEntity(
      'id' in dto ? dto.id : 0, // Aseguramos que `id` sea manejado correctamente
      dto.email,
      dto.firstName,
      dto.lastName,
      dto.phone,
      UserRoleMapper.toEnum(dto.role),
      dto.password, 
      dto.tipoDeIdentificacion,
      dto.numeroDeIdentificacion,
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
      password: entity.getPassword(), 
      tipoDeIdentificacion: entity.getTipoDeIdentificacion(),
      numeroDeIdentificacion: entity.getNumeroDeIdentificacion(),
    };
  }
}
