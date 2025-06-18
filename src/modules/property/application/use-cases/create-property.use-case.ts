import { inject, injectable } from 'inversify';
import { PropertyRepository } from '../../domain/repositories/property.repository';
import { PropertyEntity } from '../../domain/entities/Property.entity'
import { CreatePropertyDto } from '../../domain/dtos/create-property.dto';


@ injectable()
export class CreatePropertyUseCase {
  constructor(
    @inject(PropertyRepository)
    private readonly propertyRepository: PropertyRepository,
  ) {}

  async handle(dto: CreatePropertyDto): Promise<PropertyEntity> {

    try {
      return await this.propertyRepository.create(dto);
    } catch (error) {
      console.error('[CreatePropertyUseCase] Error:', error);
      throw new Error('No se pudo crear la propiedad.');
    }
  }
}