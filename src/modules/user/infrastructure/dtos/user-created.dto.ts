export interface UserCreatedDto {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phone: number;
    role: string;
    password: string;   
    tipoDeIdentificacion: string;
    numeroDeIdentificacion: number;
}