import { IsString } from "class-validator";

export class TrabajadorDto {
  @IsString({ message: "La $property debe ser un texto" })
  tipotrabajador: string;

  @IsString({ message: "La $property debe ser un texto" })
  nombres: string;

  @IsString({ message: "La $property debe ser un texto" })
  apellidos: string;

  @IsString({ message: "La $property debe ser un texto" })
  dni: string;

  @IsString({ message: "La $property debe ser un texto" })
  fnacimiento: string;

  @IsString({ message: "La $property debe ser un texto" })
  area: string;

  @IsString({ message: "La $property debe ser un texto" })
  cargo: string;

  @IsString({ message: "La $property debe ser un texto" })
  fingreso: string;
}