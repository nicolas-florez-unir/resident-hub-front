import { inject, injectable } from 'inversify';
import { PropertyEntity } from '../../domain/entities/Property.entity';
import { HttpClient } from 'src/modules/common/http/domain/HttpClient';
import { PropertyRepository } from '../../domain/repositories/property.repository';
import { CreatePropertyDto } from '../../domain/dtos/create-property.dto';  
import { PropertyCreatedDto } from '../dtos/property-created.dto';
import { PropertyEntityMapper } from '../mappers/property-entity.mapper'; 
import { PropertyReadedDto } from '../dtos/property-readed.dto';
import { UpdatePropertyDto } from '../../domain/dtos/update-property.dto';
import { PropertyUpdatedDto } from '../dtos/property-updated.dto';



@injectable()
export class ApiPropertyRepository extends PropertyRepository {


  private handleError(error: unknown, message: string): void {
    if (error instanceof Error) {
      console.error(message + '. Error:', error.message);
      throw new Error(error.message);
    } else {
      console.error('Unknown error:', error);
      throw new Error('Ocurrió un error desconocido.');
    }
  }

  constructor(
    @inject(HttpClient)
    private readonly httpClient: HttpClient,
  ) {
    super();
  }

  async create(dto: CreatePropertyDto): Promise<PropertyEntity> {
    try {

      if (!dto.getId()) {
        throw new Error('El ID de la propiedad es obligatorio para ser creada.');
      }

      this.validatePropertyDto(dto);

      const result = await this.httpClient.post<PropertyCreatedDto>(`/property`, {
        id: dto.getId(), 
        noUnidad: dto.getNoUnidad(),
        propietario: dto.getPropietario(),
        memo: dto.getMemo(),
      });

      return PropertyEntityMapper.toEntity(result);
    } catch (error) {
      this.handleError(error, 'Error al crear la propiedad');
      throw error;
    }
  }

  async findById(id: number): Promise<PropertyEntity> {
    try {

      if (!id) {
        throw new Error('El ID de la propiedad es obligatorio para buscarla.');
      }

      const result = await this.httpClient.get<PropertyReadedDto>(`/property/${id}`);
      return PropertyEntityMapper.toEntity(result);
    } catch (error) {
      this.handleError(error, `Error al buscar la propiedad por ID: ${id}`);
      throw error;
    }
  }

async findAll(): Promise<PropertyEntity[]> {
  try {
    const result = await this.httpClient.get<PropertyReadedDto[]>(`/property`);
    return result.map(dto => PropertyEntityMapper.toEntity(dto));
  } catch (error) {
    this.handleError(error, 'Error al buscar todas las propiedades');
    return [];
  }
}

  async update(dto: UpdatePropertyDto): Promise<PropertyEntity> {
    try {
      this.validatePropertyDto(dto);

      const result = await this.httpClient.put<PropertyUpdatedDto>(`/property`, {
        id: dto.getId(),
        noUnidad: dto.getNoUnidad(),
        propietario: dto.getPropietario(),  
        memo: dto.getMemo(),
      });

      return PropertyEntityMapper.toEntity(result);
    } catch (error) {
      this.handleError(error, 'Error al actualizar la propiedad');
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.httpClient.delete(`/property/${id}`);
    } catch (error) {
      this.handleError(error, 'Error al eliminar la propiedad');
      throw error;
    }
  }

  private validatePropertyDto(dto: CreatePropertyDto | UpdatePropertyDto): void {
    if ( !dto.getNoUnidad() || !dto.getPropietario() || !dto.getMemo()) {
      throw new Error('Todos los campos son obligatorios para crear una propiedad.');
    }
  }


}