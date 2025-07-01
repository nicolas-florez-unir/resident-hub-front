import { inject, injectable } from 'inversify';

import { HttpClient } from 'src/modules/common/http/domain/HttpClient';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserEntityMapper } from '../mappers/user-entity.mapper';
import { CreateUserDto, UpdateUserDto, UserDto } from '../../domain/dtos';

@injectable()
export class ApiUserRepository extends UserRepository {
  constructor(
    @inject(HttpClient)
    private readonly httpClient: HttpClient,
  ) {
    super();
  }

  async create(dto: CreateUserDto): Promise<UserEntity> {
    try {
      const result = await this.httpClient.post<UserDto>(`/user`, {
        email: dto.getEmail(),
        firstName: dto.getFirstName(),
        lastName: dto.getLastName(),
        phone: dto.getPhone(),
        role: dto.getRole(),
        password: dto.getPassword(),
      });

      return UserEntityMapper.toEntity(result);
    } catch (error) {
      console.log('Error al crear el usuario:', error);
      throw error;
    }
  }

  async update(dto: UpdateUserDto): Promise<UserEntity> {
    try {
      const result = await this.httpClient.put<UserDto>(`/user`, {
        email: dto.getEmail(),
        firstName: dto.getFirstName(),
        lastName: dto.getLastName(),
        phone: dto.getPhone(),
        role: dto.getRole(),
      });

      return UserEntityMapper.toEntity(result);
    } catch (error) {
      console.log('Error al actualizar el usuario:', error);
      throw error;
    }
  }

  /** Obtener un usuario por ID */
  async findById(id: number): Promise<UserEntity> {
    try {
      const result = await this.httpClient.get<UserDto>(`/user/${id}`);
      return UserEntityMapper.toEntity(result);
    } catch (error) {
      console.log(`Error al obtener el usuario con ID: ${id}`, error);
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.httpClient.delete<void>(`/user/${id}`);
    } catch (error) {
      console.log(`Error al eliminar el usuario con ID: ${id}`, error);
      throw error;
    }
  }

  async updateById(dto: UpdateUserDto): Promise<UserEntity> {
    try {
      const result = await this.httpClient.patch<UserDto>(`/user/${dto.getId()}`, {
        email: dto.getEmail(),
        firstName: dto.getFirstName(),
        lastName: dto.getLastName(),
        phone: dto.getPhone(),
        role: dto.getRole(),
      });

      return UserEntityMapper.toEntity(result);
    } catch (error) {
      console.log('Error al actualizar el usuario:', error);
      throw error;
    }
  }
}
