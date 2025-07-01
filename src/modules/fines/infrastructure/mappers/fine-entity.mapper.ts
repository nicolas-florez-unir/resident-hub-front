import { HouseEntityMapper } from 'src/modules/house/infrastructure/mappers/house-entity.mapper';
import type { FineDto } from '../../domain/dtos/fine.dto';
import { FineEntity } from '../../domain/entities/Fine.entity';

export class FineEntityMapper {
  static toEntity(dto: FineDto): FineEntity {
    return new FineEntity(
      dto.id,
      dto.type,
      HouseEntityMapper.toEntity(dto.house),
      dto.issuedDate,
      dto.currency,
      dto.amount,
      dto.reason,
      dto.status,
    );
  }

  static toDto(entity: FineEntity): FineDto {
    return {
      id: entity.getId(),
      type: entity.getTypeFine(),
      house: HouseEntityMapper.toDto(entity.getHouse()),
      issuedDate: entity.getIssuedDate(),
      currency: entity.getCurrency(),
      amount: entity.getAmount(),
      reason: entity.getReason(),
      status: entity.getStatus(),
    };
  }
}
