import type { FineEntity } from '../entities/Fine.entity';
import type { CreateFineDto } from '../dtos/create-fine.dto';   
import type { UpdateFineDto } from '../dtos/update-fine.dto';
export abstract class FineRepository {  
    // Método para crear una multa
    abstract create(dto: CreateFineDto): Promise<FineEntity>;
    
    // Método para actualizar una multa
    abstract update(dto: UpdateFineDto): Promise<FineEntity>;
    
    // Método para obtener todas las multas
    abstract findAll(): Promise<FineEntity[]>;
    
    // Método para obtener una multa por ID
    abstract findById(id: string): Promise<FineEntity>;
    
    // Método para eliminar una multa
    abstract delete(id: string): Promise<void>;
    }