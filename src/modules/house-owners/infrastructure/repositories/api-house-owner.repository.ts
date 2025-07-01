import { inject, injectable } from 'inversify';
import { HouseOwnerRepository } from '../../domain/repositories/house-owner.repository';
import { HttpClient } from 'src/modules/common/http/domain/HttpClient';
import { UserEntity } from 'src/modules/user/domain/entities';
import { UserDto } from 'src/modules/user/domain/dtos';
import { UserEntityMapper } from 'src/modules/user/infrastructure/mappers/user-entity.mapper';

@injectable()
export class ApiHouseOwnerRepository extends HouseOwnerRepository {
  constructor(
    @inject(HttpClient)
    private readonly httpClient: HttpClient,
  ) {
    super();
  }

  async getManyByCondominium(): Promise<UserEntity[]> {
    try {
      const result = await this.httpClient.get<UserDto[]>(`/house-owner/many-by-condominium/`);
      return result.map((userDto) => UserEntityMapper.toEntity(userDto));
    } catch (error) {
      console.log(`Error al obtener los propietarios`, error);
      throw error;
    }
  }
}
