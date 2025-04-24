import type { Newable, ServiceIdentifier } from 'inversify';
import { Container } from 'inversify';
import {
  LoginUseCase,
  RefreshAccessTokenUseCase,
  ValidateAccessToken,
} from 'src/modules/auth/login/application/use-cases';
import { AuthRepository } from 'src/modules/auth/login/domain/repositories';
import { ApiAuthRepository } from 'src/modules/auth/login/infrastructure/repositories';
import { HttpClient } from 'src/modules/common/http/domain/HttpClient';
import { AxiosHttpClient } from 'src/modules/common/http/infrastructure/axios/AxiosHttpClient';
import { GetCondominiumInfoUseCase } from 'src/modules/condominium/application/use-cases/get-condominium-info.use-case';
import { UpdateCondominiumLogoUseCase } from 'src/modules/condominium/application/use-cases/update-condominium-logo.use-case';
import { CondominiumRepository } from 'src/modules/condominium/domain/repositories/condominium.repository';
import { ApiCondominiumRepository } from 'src/modules/condominium/infrastructure/repositories/api-condominium.repository';
import { UpdateUserUseCase } from 'src/modules/user/application/use-cases/update-user.use-case';
import { UserRepository } from 'src/modules/user/domain/repositories';
import { ApiUserRepository } from 'src/modules/user/infrastructure/repositories';

class ApplicationContainer {
  private readonly container: Container = new Container();

  private readonly repositories: Array<{
    abstract: ServiceIdentifier;
    resolve: Newable;
  }> = [
    {
      abstract: AuthRepository,
      resolve: ApiAuthRepository,
    },
    {
      abstract: HttpClient,
      resolve: AxiosHttpClient,
    },
    {
      abstract: UserRepository,
      resolve: ApiUserRepository,
    },
    {
      abstract: CondominiumRepository,
      resolve: ApiCondominiumRepository,
    },
  ];

  private readonly useCases: Array<ServiceIdentifier> = [
    LoginUseCase,
    UpdateUserUseCase,
    UpdateCondominiumLogoUseCase,
    GetCondominiumInfoUseCase,
    RefreshAccessTokenUseCase,
    ValidateAccessToken,
  ];

  constructor() {
    this.bindRepositories();
    this.bindUseCases();
  }

  private bindRepositories() {
    this.repositories.forEach(({ abstract, resolve }) => this.container.bind(abstract).to(resolve));
  }

  private bindUseCases() {
    this.useCases.forEach((useCase) => this.container.bind(useCase).toSelf());
  }

  getFromContainer<T>(key: ServiceIdentifier<T>): T {
    return this.container.get(key);
  }
}

const applicationContainer = new ApplicationContainer();

export { applicationContainer };
