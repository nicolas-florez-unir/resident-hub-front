import { inject } from 'inversify';
import { UserRepository } from 'src/modules/user/domain/repositories';

export class DeleteHouseOwnerUseCase {
  constructor(
    @inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  public async handle(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
