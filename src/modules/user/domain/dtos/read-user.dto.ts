export interface ReadUserListDto {
  users: ReadUserDto[]; // Lista de usuarios
}
export interface ReadUserDto {
  id: number; // Identificador único del usuario
  email: string; // Correo electrónico del usuario
  firstName: string; // Nombre del usuario
  lastName: string; // Apellido del usuario
  phone: string; // Teléfono del usuario
  role: string; // Rol del usuario (ej. admin, user, etc.)
  password: string; // Contraseña del usuario
  tipoDeIdentificacion: string; // Tipo de identificación (ej. DNI, pasaporte)
  numeroDeIdentificacion: number; // Número de identificación
}
export interface ReadUserByIdDto {
  user: ReadUserDto; // Detalles del usuario
}
