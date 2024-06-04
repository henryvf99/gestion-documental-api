import { Injectable } from "@decorators/di";
import { Model } from "mongoose";
import { Permiso, PermisoDoc } from "../models";
import { BaseRepository } from "./base.repository";

@Injectable()
export class PermisosRepository extends BaseRepository {
  permiso: Model<PermisoDoc>;
  constructor() {
    super(Permiso);
    this.permiso = Permiso;
  }
}