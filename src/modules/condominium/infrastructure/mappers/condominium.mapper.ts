import { UserEntityMapper } from 'src/modules/user/infrastructure/mappers/user-entity.mapper';
import { CondominiumEntity } from '../../domain/entities/condominium.entity';
import type { CondominiumDto } from '../dtos';

export class CondominiumEntityMapper {
  static toEntity(dto: CondominiumDto): CondominiumEntity {
    return new CondominiumEntity(
      dto.id,
      dto.name,
      null, // Assuming logo is not provided in the DTO, adjust as necessary
      dto.address,
      dto.administrator ? UserEntityMapper.toEntity(dto.administrator) : undefined, // Assuming administrator is part of the DTO,
    );
  }

  static toDto(entity: CondominiumEntity): CondominiumDto {
    return {
      id: entity.id,
      name: entity.name,
      logo: entity.logo, // Assuming logo is null or a valid value
      address: entity.address,
      ...(entity.administrator
        ? { administrator: UserEntityMapper.toDto(entity.administrator) }
        : undefined),
    };
  }
}
