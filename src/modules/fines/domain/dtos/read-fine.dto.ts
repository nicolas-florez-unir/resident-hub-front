export interface ReadFineListDto {
  fines: ReadFineDto[]; // Lista de multas
}

export interface ReadFineDto {
  id: string; // Identificador único de la multa
  typeFine: string; // Tipo de multa
  userId: string; // ID del usuario al que se le impuso la multa
  amount: number; // Monto de la multa
  description: string; // Descripción de la multa
  status: 'pending' | 'paid' | 'overdue'; // Estado de la multa
  createdAt: Date; // Fecha de creación de la multa
}
export interface ReadFineByIdDto {
  fine: ReadFineDto; // Detalles de la multa
}
