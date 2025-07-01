import { inject } from 'inversify';
import { UpdateUserDto } from 'src/modules/user/domain/dtos';
import { UserEntity } from 'src/modules/user/domain/entities';
import { UserRole } from 'src/modules/user/domain/enums';
import { UserRepository } from 'src/modules/user/domain/repositories';

interface UpdateHouseOwnerDto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export class UpdateHouseOwnersUseCase {
  constructor(
    @inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  public async handle(dto: UpdateHouseOwnerDto): Promise<UserEntity> {
    const user = await this.userRepository.updateById(
      new UpdateUserDto(
        dto.id,
        dto.email,
        dto.firstName,
        dto.lastName,
        dto.phone,
        UserRole.HouseOwner,
      ),
    );

    return user;
  }
}
