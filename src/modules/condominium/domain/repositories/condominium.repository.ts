import type { CondominiumEntity } from '../entities/condominium.entity';

export abstract class CondominiumRepository {
  abstract updateLogo(file: File): Promise<void>;
  abstract getInfo(): Promise<CondominiumEntity>;
}
