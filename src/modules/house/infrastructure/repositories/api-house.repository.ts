import { inject, injectable } from 'inversify';
import { HouseEntity } from '../../domain/entities/house.entity';
import { HouseRepository } from '../../domain/repositories/house.repository';
import { HttpClient } from 'src/modules/common/http/domain/HttpClient';
import { HouseDto } from '../dtos/house.dto';
import { HouseEntityMapper } from '../mappers/house-entity.mapper';

@injectable()
export class ApiHouseRepository extends HouseRepository {
  constructor(
    @inject(HttpClient)
    private readonly httpClient: HttpClient,
  ) {
    super();
  }

  async getByCondominium(): Promise<HouseEntity[]> {
    const houses = await this.httpClient.get<HouseDto[]>('/house/by-condominium');
    return houses.map((houseDto) => HouseEntityMapper.toEntity(houseDto));
  }

  async create(houseNumber: string, ownerId: number): Promise<HouseEntity> {
    const house = await this.httpClient.post<HouseDto>('/house', {
      houseNumber,
      ownerId,
    });
    return HouseEntityMapper.toEntity(house);
  }

  async delete(id: number): Promise<void> {
    await this.httpClient.delete(`/house/${id}`);
  }

  async update(id: number, houseNumber: string, ownerId: number): Promise<HouseEntity> {
    const updatedHouse = await this.httpClient.patch<HouseDto>(`/house/${id}`, {
      houseNumber,
      ownerId,
    });
    return HouseEntityMapper.toEntity(updatedHouse);
  }
}
