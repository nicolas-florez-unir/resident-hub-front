import { CondominiumRepository } from '../../domain/repositories/condominium.repository';
import { inject, injectable } from 'inversify';
import { HttpClient } from 'src/modules/common/http/domain/HttpClient';
import { CondominiumDto } from '../dtos';
import { CondominiumEntity } from '../../domain/entities/condominium.entity';
import { CondominiumEntityMapper } from '../mappers/condominium.mapper';

@injectable()
export class ApiCondominiumRepository extends CondominiumRepository {
  constructor(
    @inject(HttpClient)
    private readonly httpClient: HttpClient,
  ) {
    super();
  }

  async updateLogo(file: File): Promise<void> {
    const formData = new FormData();
    formData.append('file', file);
    await this.httpClient.put('/condominium/logo', formData);
  }

  async getInfo(): Promise<CondominiumEntity> {
    const condominium = await this.httpClient.get<CondominiumDto>('/condominium/info');
    return CondominiumEntityMapper.toEntity(condominium);
  }
}
