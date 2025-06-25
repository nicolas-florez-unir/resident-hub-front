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
import { DeleteUserUseCase } from 'src/modules/user/application/use-cases/delete-user.use-case';
import { CreateUserUseCase } from 'src/modules/user/application/use-cases/create-user.use-case';
import { ReadUserUseCase } from 'src/modules/user/application/use-cases/read-user.use-case';
import { UserRepository } from 'src/modules/user/domain/repositories';
import { ApiUserRepository } from 'src/modules/user/infrastructure/repositories';
import { PropertyRepository } from 'src/modules/property/domain/repositories';
import { ApiPropertyRepository } from 'src/modules/property/infraestructure/repositories/api-property.repository';
import { UpdatePropertyUseCase } from 'src/modules/property/application/use-cases/update-property.use-case';
import { DeletePropertyUseCase } from 'src/modules/property/application/use-cases/delete-property.use-case';
import { CreatePropertyUseCase } from 'src/modules/property/application/use-cases/create-property.use-case';
import { ReadPropertyUseCase } from 'src/modules/property/application/use-cases/read-property.use-case';
import { UpdateFineUseCase } from 'src/modules/fines/application/use-cases/update-fine.use-case';
import { DeleteFineUseCase } from 'src/modules/fines/application/use-cases/delete-fine.use-case';
import { CreateFineUseCase } from 'src/modules/fines/application/use-cases/create-fine.use-case';
import { ReadFineUseCase } from 'src/modules/fines/application/use-cases/read-fine.use-case';
import { FineRepository } from 'src/modules/fines/domain/repositories';
import { ApiFineRepository } from 'src/modules/fines/infrastructure/repositories/api-fine.repository';


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
    {
      abstract: PropertyRepository,
      resolve: ApiPropertyRepository,
    },
    {
      abstract: FineRepository,
      resolve: ApiFineRepository,
    },
  ];

  private readonly useCases: Array<ServiceIdentifier> = [
    LoginUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    CreateUserUseCase,
    ReadUserUseCase,
    UpdateCondominiumLogoUseCase,
    GetCondominiumInfoUseCase,
    RefreshAccessTokenUseCase,
    ValidateAccessToken,
    UpdatePropertyUseCase,
    DeletePropertyUseCase,  
    CreatePropertyUseCase,
    ReadPropertyUseCase,
    UpdateFineUseCase,
    DeleteFineUseCase,  
    CreateFineUseCase,
    ReadFineUseCase,
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
