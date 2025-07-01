import { inject } from 'inversify';
import { CreateUserDto } from 'src/modules/user/domain/dtos';
import { UserEntity } from 'src/modules/user/domain/entities';
import { UserRole } from 'src/modules/user/domain/enums';
import { UserRepository } from 'src/modules/user/domain/repositories';

interface CreateHouseOwnerDto {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export class CreateHouseOwnersUseCase {
  constructor(
    @inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  public async handle(dto: CreateHouseOwnerDto): Promise<UserEntity> {
    const user = await this.userRepository.create(
      new CreateUserDto(
        dto.email,
        dto.firstName,
        dto.lastName,
        dto.phone,
        UserRole.HouseOwner,
        'residenthub314*',
      ),
    );

    return user;
  }
}
