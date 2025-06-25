export interface FineUpdatedDto {
    id: string;
    typeFine: string;
    userId: string;
    amount: number;
    description: string;
    status: 'pending' | 'paid' | 'overdue';
    createdAt: Date;
    }