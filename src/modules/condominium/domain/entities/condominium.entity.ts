import type { UserEntity } from 'src/modules/user/domain/entities';

export class CondominiumEntity {
  constructor(
    public id: number,
    public name: string,
    public logo: null,
    public address: string,
    public administrator?: UserEntity,
  ) {}
}
