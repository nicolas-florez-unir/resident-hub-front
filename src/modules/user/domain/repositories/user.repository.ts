import type { UpdateUserDto } from '../dtos/update-user.dto';
import type { CreateUserDto } from '../dtos/create-user.dto';
import type { UserEntity } from '../entities/user.entity';

export abstract class UserRepository {
  // Método para crear un usuario
  abstract create(dto: CreateUserDto): Promise<UserEntity>;

  // Método para actualizar un usuario
  abstract update(dto: UpdateUserDto): Promise<UserEntity>;

  // Método para obtener todos los usuarios
  abstract findAll(): Promise<UserEntity[]>;

  // Método para obtener un usuario por ID
  abstract findById(id: number): Promise<UserEntity>;

  // Método para eliminar un usuario
  abstract delete(id: number): Promise<void>;
}
