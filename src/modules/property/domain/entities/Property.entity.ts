export class PropertyEntity {
  constructor(
    private readonly id: number,
    private readonly noUnidad: string,
    private readonly propietario: string,
    private readonly memo: string,
  ) {}

  public getId(): number {
    return this.id;
  }

  public getNoUnidad(): string {
    return this.noUnidad;
  }

  public getPropietario(): string {
    return this.propietario;
  }

  public getMemo(): string {
    return this.memo;
  }
}
