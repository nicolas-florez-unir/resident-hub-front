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
import { GetUserUseCase } from 'src/modules/user/application/use-cases/get-user.use-case';
import { UserRepository } from 'src/modules/user/domain/repositories';
import { ApiUserRepository } from 'src/modules/user/infrastructure/repositories';
import { UpdateFineUseCase } from 'src/modules/fines/application/use-cases/update-fine.use-case';
import { DeleteFineUseCase } from 'src/modules/fines/application/use-cases/delete-fine.use-case';
import { CreateFineUseCase } from 'src/modules/fines/application/use-cases/create-fine.use-case';
import { FineRepository } from 'src/modules/fines/domain/repositories';
import { ApiFineRepository } from 'src/modules/fines/infrastructure/repositories/api-fine.repository';
import { GetHouseOwnersUseCase } from 'src/modules/house-owners/application/use-cases/get-house-owners.use-case';
import { CreateHouseOwnersUseCase } from 'src/modules/house-owners/application/use-cases/create-house-owner.use-case';
import { HouseOwnerRepository } from 'src/modules/house-owners/domain/repositories/house-owner.repository';
import { ApiHouseOwnerRepository } from 'src/modules/house-owners/infrastructure/repositories/api-house-owner.repository';
import { UpdateHouseOwnersUseCase } from 'src/modules/house-owners/application/use-cases/update-house-owner.use-case';
import { DeleteHouseOwnerUseCase } from 'src/modules/house-owners/application/use-cases/delete-house-owner.use-case';
import { GetHousesByCondominiumUseCase } from 'src/modules/house/application/use-cases/get-houses-by-condominium.use-case';
import { HouseRepository } from 'src/modules/house/domain/repositories/house.repository';
import { ApiHouseRepository } from 'src/modules/house/infrastructure/repositories/api-house.repository';
import { CreateHouseUseCase } from 'src/modules/house/application/use-cases/create-house.use-case';
import { DeleteHouseUseCase } from 'src/modules/house/application/use-cases/delete-house.use-case';
import { UpdateHouseUseCase } from 'src/modules/house/application/use-cases/update-house.use-case';
import { GetFinesUseCase } from 'src/modules/fines/application/use-cases/get-fines.use-case';

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
      abstract: FineRepository,
      resolve: ApiFineRepository,
    },
    {
      abstract: HouseOwnerRepository,
      resolve: ApiHouseOwnerRepository,
    },
    {
      abstract: HouseRepository,
      resolve: ApiHouseRepository,
    },
  ];

  private readonly useCases: Array<ServiceIdentifier> = [
    LoginUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    CreateUserUseCase,
    GetUserUseCase,
    UpdateCondominiumLogoUseCase,
    GetCondominiumInfoUseCase,
    RefreshAccessTokenUseCase,
    ValidateAccessToken,
    UpdateFineUseCase,
    DeleteFineUseCase,
    CreateFineUseCase,
    GetHouseOwnersUseCase,
    CreateHouseOwnersUseCase,
    UpdateHouseOwnersUseCase,
    DeleteHouseOwnerUseCase,
    GetHousesByCondominiumUseCase,
    CreateHouseUseCase,
    DeleteHouseUseCase,
    UpdateHouseUseCase,
    GetFinesUseCase,
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
