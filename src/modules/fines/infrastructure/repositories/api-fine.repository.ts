import { inject, injectable } from 'inversify';
import { HttpClient } from 'src/modules/common/http/domain/HttpClient';
import { FineRepository } from '../../domain/repositories/fine.repository';
import { FineEntity } from '../../domain/entities/Fine.entity';
import { FineEntityMapper } from '../mappers/fine-entity.mapper';
import { FineDto } from '../../domain/dtos/fine.dto';
import { CreateFineDto } from '../../domain/dtos/create-fine.dto';
import { UpdateFineDto } from '../../domain/dtos/update-fine.dto';

@injectable()
export class ApiFineRepository extends FineRepository {
  constructor(@inject(HttpClient) private readonly httpClient: HttpClient) {
    super();
  }

  async create(dto: CreateFineDto): Promise<FineEntity> {
    const result = await this.httpClient.post<FineDto>(`/fine`, {
      type: dto.type,
      houseId: dto.houseId,
      issuedDate: dto.issuedDate,
      amount: parseInt(dto.amount.toString()),
      currency: dto.currency,
      status: dto.status,
      reason: dto.reason,
    });

    return FineEntityMapper.toEntity(result);
  }

  async findAll(): Promise<FineEntity[]> {
    const result = await this.httpClient.get<FineDto[]>(`/fine/all`);
    return result.map((dto) => FineEntityMapper.toEntity(dto));
  }

  async update(dto: UpdateFineDto): Promise<FineEntity> {
    const result = await this.httpClient.put<FineDto>(`/fine/${dto.id}`, {
      type: dto.type,
      houseId: dto.houseId,
      issuedDate: dto.issuedDate,
      amount: dto.amount,
      currency: dto.currency,
      status: dto.status,
      reason: dto.reason,
    });

    return FineEntityMapper.toEntity(result);
  }

  async delete(id: number): Promise<void> {
    await this.httpClient.delete(`/fine/${id}`);
  }
}
