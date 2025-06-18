import { inject, injectable } from 'inversify';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserEntity } from '../../domain/entities/user.entity';
import { CreateUserDto } from '../../domain/dtos/create-user.dto';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async handle(dto: CreateUserDto): Promise<UserEntity> {
    try {
      return await this.userRepository.create(dto);
    } catch (error) {
      console.error('[CreateUserUseCase] Error:', error);
      throw new Error('No se pudo crear el usuario.');
    }
  }
}
