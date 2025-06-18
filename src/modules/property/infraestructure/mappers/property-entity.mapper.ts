import type { PropertyDto } from '../../domain/dtos/property.dto';
import type { PropertyUpdatedDto } from "../dtos/property-updated.dto";
import { PropertyEntity } from "../../domain/entities";

export class PropertyEntityMapper {
  static toEntity(dto: PropertyDto| PropertyUpdatedDto): PropertyEntity {
    return new PropertyEntity(
      dto.id,
      dto.noUnidad,
      dto.propietario,
      dto.memo
    );
  }

  static toDto(entity: PropertyEntity): PropertyDto {
    return {
      id: entity.getId(),
      noUnidad: entity.getNoUnidad(),
      propietario: entity.getPropietario(),
      memo: entity.getMemo()
    };
  }
}