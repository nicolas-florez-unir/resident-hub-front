import { inject, injectable } from 'inversify';

import { HttpClient } from 'src/modules/common/http/domain/HttpClient';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { UserAuthenticatedDto } from '../dtos/user-authenticated.dto';
import { UnauthorizedException } from '../../domain/exceptions';
import { HttpClientException } from 'src/modules/common/http/domain/exceptions/http-client.exception';
import { UserEntityMapper } from 'src/modules/user/infrastructure/mappers/user-entity.mapper';
import { ApiAuthEndpoints } from '../endpoints/api/auth.endpoints';

@injectable()
export class ApiAuthRepository extends AuthRepository {
  constructor(@inject(HttpClient) private readonly httpClient: HttpClient) {
    super();
  }

  async login(email: string, password: string): Promise<{ user: UserEntity; accessToken: string }> {
    const result = await this.httpClient.post<UserAuthenticatedDto>(ApiAuthEndpoints.LOGIN, {
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
      ApiAuthEndpoints.REFRESH_ACCESS_TOKEN,
      {},
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
        ApiAuthEndpoints.VALIDATE_ACCESS_TOKEN,
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
