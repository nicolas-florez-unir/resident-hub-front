import { inject, injectable } from 'inversify';
import { PropertyRepository } from '../../domain/repositories/property.repository';
import { PropertyEntity } from '../../domain/entities/Property.entity';
import { UpdatePropertyDto } from '../../domain/dtos/update-property.dto';

@injectable()
export class UpdatePropertyUseCase {
  constructor(
    @inject(PropertyRepository)
    private readonly propertyRepository: PropertyRepository,
  ) {}

    async handle(dto: UpdatePropertyDto): Promise<PropertyEntity> {
        try {
        return await this.propertyRepository.update(dto);
        } catch (error) {
        console.error('[UpdatePropertyUseCase] Error:', error);
        throw new Error('No se pudo actualizar la propiedad.');
        }
    }   
}
