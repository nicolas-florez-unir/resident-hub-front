import type { UpdatePropertyDto } from '../dtos/update-property.dto';
import type { CreatePropertyDto } from '../dtos/create-property.dto';
import type { PropertyEntity } from '../entities/Property.entity';

export abstract class PropertyRepository {

  // Método para crear una propiedad
  abstract create(dto: CreatePropertyDto): Promise<PropertyEntity>;

  // Método para actualizar una propiedad
  abstract update(dto: UpdatePropertyDto): Promise<PropertyEntity>;

  // Método para obtener todas las propiedades
  abstract findAll(): Promise<PropertyEntity[]>;

  // Método para obtener una propiedad por ID
  abstract findById(id: number): Promise<PropertyEntity>;

  // Método para eliminar una propiedad
  abstract delete(id: number): Promise<void>;
}