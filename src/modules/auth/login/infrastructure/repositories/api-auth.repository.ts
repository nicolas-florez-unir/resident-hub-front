import { inject, injectable } from 'inversify';

import { HttpClient } from 'src/modules/common/http/domain/HttpClient';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { UserAuthenticatedDto } from '../dtos/user-authenticated.dto';
import { UnauthorizedException } from '../../domain/exceptions';
import { HttpClientException } from 'src/modules/common/http/domain/exceptions/http-client.exception';
import { UserEntityMapper } from 'src/modules/user/infrastructure/mappers/user-entity.mapper';

enum ApiAuthRoutes {
  Login = '/auth/login',
  RefreshAccessToken = '/auth/refresh-access-token',
  ValidateAccessToken = '/auth/validate-access-token',
}

@injectable()
export class ApiAuthRepository extends AuthRepository {
  constructor(@inject(HttpClient) private readonly httpClient: HttpClient) {
    super();
  }

  async login(email: string, password: string): Promise<{ user: UserEntity; accessToken: string }> {
    const result = await this.httpClient.post<UserAuthenticatedDto>(ApiAuthRoutes.Login, {
      email,
      password,
    });

    const userEntity = UserEntityMapper.toEntity(result.user);

    return {
      user: userEntity,
      accessToken: result.accessToken,
    };
  }

  async refreshAccessToken(): Promise<{ user: UserEntity; accessToken: string }> {
    const result = await this.httpClient.post<UserAuthenticatedDto>(
      ApiAuthRoutes.RefreshAccessToken,
      {},
      {
        headers: {
          'X-Internal-Refresh': 'true',
        },
      },
    );

    const userEntity = UserEntityMapper.toEntity(result.user);

    return {
      user: userEntity,
      accessToken: result.accessToken,
    };
  }

  async validateAccessToken(): Promise<{ user: UserEntity; accessToken: string }> {
    try {
      const result = await this.httpClient.post<UserAuthenticatedDto>(
        ApiAuthRoutes.ValidateAccessToken,
        {},
      );

      const userEntity = UserEntityMapper.toEntity(result.user);

      return {
        user: userEntity,
        accessToken: result.accessToken,
      };
    } catch (error) {
      if (error instanceof HttpClientException && error.statusCode === 401) {
        throw new UnauthorizedException();
      }
      throw error;
    }
  }
}
