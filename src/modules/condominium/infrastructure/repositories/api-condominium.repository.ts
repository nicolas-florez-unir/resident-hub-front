import { CondominiumRepository } from '../../domain/repositories/condominium.repository';
import { inject, injectable } from 'inversify';
import { HttpClient } from 'src/modules/common/http/domain/HttpClient';

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

  async getInfo(): Promise<Record<string, unknown>> {
    return await this.httpClient.get('/condominium/info');
  }
}
