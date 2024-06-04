import { IsString } from "class-validator";

export class PermisosDto {
    
    @IsString({ message: "El $property debe ser un texto" })
    nombre: string;
    
    gtrabajador: boolean;
    ptrabajador: boolean;
    utrabajador: boolean;
    dtrabajador: boolean;
    gpracticante: boolean;
    ppracticante: boolean;
    upracticante: boolean;
    dpracticante: boolean;
    gboleta: boolean;
    pboleta: boolean;
    uboleta: boolean;
    dboleta: boolean;
    gplanilla: boolean;
    pplanilla: boolean;
    uplanilla: boolean;
    dplanilla: boolean;
    gemitidos: boolean;
    pemitidos: boolean;
    uemitidos: boolean;
    demitidos: boolean;
    grecibidos: boolean;
    precibidos: boolean;
    urecibidos: boolean;
    drecibidos: boolean;

}