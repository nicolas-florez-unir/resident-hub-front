import { CondominiumEntityMapper } from 'src/modules/condominium/infrastructure/mappers/condominium.mapper';
import { HouseEntity } from '../../domain/entities/house.entity';
import type { HouseDto } from '../dtos/house.dto';
import { UserEntityMapper } from 'src/modules/user/infrastructure/mappers/user-entity.mapper';

export class HouseEntityMapper {
  static toDto(houseEntity: HouseEntity): HouseDto {
    return {
      id: houseEntity.getId(),
      houseNumber: houseEntity.getHouseNumber(),
      owner: UserEntityMapper.toDto(houseEntity.getOwner()),
      condominium: CondominiumEntityMapper.toDto(houseEntity.getCondominium()),
      createdAt: new Date(), // Assuming createdAt and updatedAt are handled elsewhere
      updatedAt: new Date(),
    };
  }

  static toEntity(houseDto: HouseDto): HouseEntity {
    return new HouseEntity(
      houseDto.id,
      houseDto.houseNumber,
      CondominiumEntityMapper.toEntity(houseDto.condominium),
      UserEntityMapper.toEntity(houseDto.owner),
    );
  }
}
