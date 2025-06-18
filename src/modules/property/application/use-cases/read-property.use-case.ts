import { inject, injectable } from 'inversify';
import { PropertyRepository } from '../../domain/repositories/property.repository';
import { PropertyEntity } from '../../domain/entities/Property.entity';

@injectable()
export class ReadPropertyUseCase {
  constructor(
    @inject(PropertyRepository)
    private readonly propertyRepository: PropertyRepository,
  ) {}  

    async handle(): Promise<PropertyEntity[]> {
        try {
        return await this.propertyRepository.findAll();
        } catch (error) {
        console.error('[ReadPropertyUseCase] Error:', error);
        throw new Error('No se pudieron obtener las propiedades.');
        }
    }

    async handleById(id: number): Promise<PropertyEntity> {
        try {
        return await this.propertyRepository.findById(id);
        } catch (error) {
        console.error('[ReadPropertyUseCase] Error:', error);
        throw new Error('No se pudo obtener la propiedad.');
        }
    }

}
