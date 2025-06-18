import { inject, injectable } from 'inversify';

import { HttpClient } from 'src/modules/common/http/domain/HttpClient';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserEntity } from '../../domain/entities/user.entity';
import { UpdateUserDto } from '../../domain/dtos/update-user.dto';
import { UserUpdatedDto } from '../dtos/user-updated.dto';
import { CreateUserDto } from '../../domain/dtos/create-user.dto';
import { UserCreatedDto} from '../dtos/user-created.dto';
import { UserEntityMapper } from '../mappers/user-entity.mapper';
import { UserReadedDto } from '../dtos/user-readed.dto';



@injectable()
export class ApiUserRepository extends UserRepository {

  private handleError(error: unknown, message: string): void {
    if (error instanceof Error) {
      console.error(message+'. Error:', error.message);
      throw new Error(error.message);
    } else {
      console.error(' Unknown error:', error);
      throw new Error('Ocurrió un error desconocido.');
    }
  }

  constructor(
    @inject(HttpClient)
    private readonly httpClient: HttpClient,
  ) {
    super();
  }

  async create(dto: CreateUserDto): Promise<UserEntity> {

    try {
          if (!dto.getId()) {
            throw new Error('El ID del usuario es obligatorio para ser creado.');
          }

          this.validateUserDto(dto);

          const result = await this.httpClient.post<UserCreatedDto>(`/user`, {  
            //id: dto.getId(),    //Solo si es backend lo requiere
            email: dto.getEmail(),
            firstName: dto.getFirstName(),
            lastName: dto.getLastName(),
            phone: dto.getPhone(),
            role: dto.getRole(),
            password: dto.getPassword(),
            tipoDeIdentificacion: dto.getTipoDeIdentificacion(),
            numeroDeidentificacion: dto.getNumeroDeIdentificacion(),
          });

          return UserEntityMapper.toEntity(result);      

        } catch (error) {
            this.handleError(error, 'Error al crear el usuario');
            throw  error;
          }


  }

  async update(dto: UpdateUserDto): Promise<UserEntity> {
    try {

          this.validateUserDto(dto);

          const result = await this.httpClient.put<UserUpdatedDto>(`/user`, {      
            email: dto.getEmail(),
            firstName: dto.getFirstName(),
            lastName: dto.getLastName(),
            phone: dto.getPhone(),
            role: dto.getRole(),
            password: dto.getPassword(),
            tipoDeIdentificacion: dto.getTipoDeIdentificacion(),
            numeroDeidentificacion: dto.getNumeroDeIdentificacion(),
          });

          return UserEntityMapper.toEntity(result);
  } catch (error) {
    this.handleError(error, 'Error al actualizar el usuario');
    throw error;
  }
}


  /** Obtener todos los usuarios */
  async findAll(): Promise<UserEntity[]> {
    try {
        const result = await this.httpClient.get<UserReadedDto[]>(`/user`);
        return result.map(dto => UserEntityMapper.toEntity(dto));
    } catch (error) {
        this.handleError(error, 'Error al obtener la lista de usuarios');
        return []; // Retornar un array vacío en caso de error
    }
  }

  /** Obtener un usuario por ID */
  async findById(id: number): Promise<UserEntity> {
    try {
          if (!id) {
            throw new Error('El ID del usuario es requerido.');
          }

          const result = await this.httpClient.get<UserReadedDto>(`/user/${id}`);
          return UserEntityMapper.toEntity(result);
    } catch (error) {
      this.handleError(error, `Error al obtener el usuario con ID: ${id}`);
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    try {
          if (!id) {
            throw new Error('El ID del usuario es obligatorio para eliminar.');
          }

          await this.httpClient.delete<void>(`/user/${id}`);
    } catch (error) {
      this.handleError(error, `Error al eliminar el usuario con ID: ${id}`);
    }
  }

  private validateUserDto(dto: CreateUserDto | UpdateUserDto): void {
    if (!dto.getEmail() || !/\S+@\S+\.\S+/.test(dto.getEmail())) {
      throw new Error('El email debe ser válido.');
    }

    if (!dto.getFirstName() || !dto.getLastName()) {
      throw new Error('El nombre y apellido son obligatorios.');
    }

    if (!dto.getRole()) {
      throw new Error('El rol del usuario es obligatorio.');
    }

    if (!dto.getPassword()) {
      throw new Error('La contraseña es obligatoria.');
    }

    if (!dto.getPhone()) {
      throw new Error('El teléfono es obligatorio.');
    }

    if (!dto.getTipoDeIdentificacion() || isNaN(dto.getNumeroDeIdentificacion())) {
      throw new Error('El tipo de identificación y el número son obligatorios y deben ser válidos.');
    }
  }  
}
