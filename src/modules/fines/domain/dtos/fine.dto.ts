export interface FineDto {
    id: string;
    typeFine: string; // Assuming this is a string representing the type of fine
    userId: string; // Assuming this is a string representing the user ID    
    amount: number;
    description: string;    
    status: 'pending' | 'paid' | 'overdue';
    createdAt: Date;
    }