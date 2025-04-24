import { inject } from 'inversify';
import { AuthRepository } from '../../domain/repositories';

export class RefreshAccessTokenUseCase {
  constructor(
    @inject(AuthRepository)
    private readonly authRepository: AuthRepository,
  ) {}

  public handle() {
    return this.authRepository.refreshAccessToken();
  }
}
