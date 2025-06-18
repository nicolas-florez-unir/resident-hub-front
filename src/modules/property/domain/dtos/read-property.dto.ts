export interface ReadPropertyListDto {
  properties: ReadPropertyDto[]; // Lista de propiedades
}
export interface ReadPropertyDto {
  id: number; // Identificador único de la propiedad
  noUnidad: string;
  propietario: string;
  memo: string;
}

export interface ReadPropertyByIdDto {
  property: ReadPropertyDto; // Detalles de la propiedad
}
