import type { FineDto } from '../../domain/dtos/fine.dto';
import type { FineUpdatedDto } from '../dtos/fine-updated.dto';
import { FineEntity } from '../../domain/entities/Fine.entity';


export class FineEntityMapper {
  static toEntity(dto: FineDto | FineUpdatedDto): FineEntity {
    return new FineEntity(
        dto.id,
        dto.userId,
        dto.typeFine,
        dto.amount,
        dto.description,
        dto.status,
        dto.createdAt
    );
  }

  static toDto(entity: FineEntity): FineDto {
    return {
        id: entity.getId(),
        userId: entity.getUserId(),
        typeFine: entity.getTypeFine(),
        amount: entity.getAmount(),
        description: entity.getDescription(),
        status: entity.getStatus(),
        createdAt: entity.getCreatedAt()
    };
  }
}