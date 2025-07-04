import { inject, injectable } from 'inversify';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserEntity } from '../../domain/entities/user.entity';

@injectable()
export class GetUserUseCase {
  constructor(
    @inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  handle(): Promise<UserEntity[]> {
    throw new Error('No se pudieron obtener los usuarios.');
  }

  async handleById(id: number): Promise<UserEntity> {
    try {
      return await this.userRepository.findById(id);
    } catch (error) {
      console.error('[GetUserUseCase] Error:', error);
      throw new Error('No se pudo obtener el usuario.');
    }
  }
}
