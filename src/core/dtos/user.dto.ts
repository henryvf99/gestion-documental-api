import { IsString } from "class-validator";

export class UserDto {
  @IsString({ message: "El $property debe ser un texto" })
  email: string;
}
