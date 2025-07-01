import type { UserEntity } from 'src/modules/user/domain/entities';

export abstract class HouseOwnerRepository {
  abstract getManyByCondominium(): Promise<UserEntity[]>;
}
