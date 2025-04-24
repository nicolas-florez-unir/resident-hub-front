import type { UserEntity } from 'src/modules/user/domain/entities/user.entity';

type LoginResponse = {
  user: UserEntity;
  accessToken: string;
};

export abstract class AuthRepository {
  abstract login(email: string, password: string): Promise<LoginResponse>;
  abstract validateAccessToken(): Promise<LoginResponse>;
  abstract refreshAccessToken(): Promise<LoginResponse>;
}
