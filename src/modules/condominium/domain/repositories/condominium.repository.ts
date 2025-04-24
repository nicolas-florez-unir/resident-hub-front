export abstract class CondominiumRepository {
  abstract updateLogo(file: File): Promise<void>;
  abstract getInfo(): Promise<Record<string, unknown>>;
}
