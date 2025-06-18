import { inject, injectable } from 'inversify';
import { UserRepository } from '../../domain/repositories/user.repository';
import { DeleteUserDto } from '../../domain/dtos/delete-user.dto';

@injectable()
export class DeleteUserUseCase {
  constructor(
    @inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

    async handle(dto: DeleteUserDto): Promise<void> {
        try {
        await this.userRepository.delete(dto.getId());        
        } catch (error) {
        console.error('[DeleteUserUseCase] Error:', error);
        throw new Error('No se pudo eliminar el usuario.');
        }
    }
}