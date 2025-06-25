import { inject, injectable } from 'inversify';
import { HttpClient } from 'src/modules/common/http/domain/HttpClient';
import { FineRepository } from '../../domain/repositories/fine.repository';
import { FineEntity } from '../../domain/entities/Fine.entity';
import { FineEntityMapper } from '../mappers/fine-entity.mapper';
import { FineDto } from '../../domain/dtos/fine.dto';
import { FineCreatedDto } from '../dtos/fine-created.dto';
import { FineUpdatedDto } from '../dtos/fine-updated.dto';
import { CreateFineDto } from '../../domain/dtos/create-fine.dto';
import { UpdateFineDto } from '../../domain/dtos/update-fine.dto';  
import { FineReadedDto } from '../dtos';


@injectable()
export class ApiFineRepository extends FineRepository {

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
    @inject(HttpClient) private readonly httpClient: HttpClient,   
  ) {
    super();
  }

    async create(dto: CreateFineDto): Promise<FineEntity> {
        try {
            if (!dto.getId()) {
                throw new Error('El ID de la multa es obligatorio para ser creada.');
            }

            this.validateFineDto(dto);

            const result = await this.httpClient.post<FineCreatedDto>(`/fines`, {
                id: dto.getId(),
                userId: dto.getUserId(),
                typeFine: dto.getTypeFine(),
                amount: dto.getAmount(),
                description: dto.getDescription(),
            });
            if (!result) {
                throw new Error('No se pudo crear la multa. Verifique los datos proporcionados.');
            }

            return FineEntityMapper.toEntity(result);
        } catch (error) {
            this.handleError(error, 'Error al crear la multa');
            throw error;
        }
    }

    async findById(id: string): Promise<FineEntity> {
        try {
            if (!id) {
                throw new Error('El ID de la multa es obligatorio para ser buscada.');
            }

            const result = await this.httpClient.get<FineDto>(`/fines/${id}`);
            return FineEntityMapper.toEntity(result);
        } catch (error) {
            this.handleError(error, 'Error al buscar la multa por ID');
            throw error;
        }
    }

    async findAll(): Promise<FineEntity[]> {
        try {
            const result = await this.httpClient.get<FineReadedDto[]>(`/fines`);
            return result.map(dto => FineEntityMapper.toEntity(dto));
        } catch (error) {
            this.handleError(error, 'Error al buscar todas las multas');
            return [];
        }
    }

    async update(dto: UpdateFineDto): Promise<FineEntity> {
        try {
            if (!dto.getId()) {
                throw new Error('El ID de la multa es obligatorio para ser actualizada.');
            }

            this.validateFineDto(dto);

            const result = await this.httpClient.put<FineUpdatedDto>(`/fines/${dto.getId()}`, {
                id: dto.getId(),
                userId: dto.getUserId(),
                typeFine: dto.getTypeFine(),
                amount: dto.getAmount(),
                description: dto.getDescription(),
                status: dto.getStatus(),
            });

            return FineEntityMapper.toEntity(result);
        } catch (error) {
            this.handleError(error, 'Error al actualizar la multa');
            throw error;
        }
    }

    async delete(id: string): Promise<void> {
        try {
            if (!id) {
                throw new Error('El ID de la multa es obligatorio para ser eliminada.');
            }

            await this.httpClient.delete(`/fines/${id}`);
        } catch (error) {
            this.handleError(error, 'Error al eliminar la multa');
            throw error;
        }
    }

    private validateFineDto(dto: CreateFineDto | UpdateFineDto): void {
        if (!dto.getUserId()) {
            throw new Error('El ID del usuario es obligatorio.');
        }   
        
        if (!dto.getTypeFine()) {
            throw new Error('El tipo de multa es obligatorio.');
        }

        if (dto.getAmount() <= 0) {
            throw new Error('El monto de la multa debe ser mayor a cero.');
        }   
        if (!dto.getDescription()) {
            throw new Error('La descripción de la multa es obligatoria.');
        }
        if (!dto.getStatus()) {
            throw new Error('El estado de la multa es obligatorio.');
        }
    }

}