import mongoose from "mongoose";

export interface BaseOperations {
  get(id: string | number);
  getAll(pageSize?: number, pageNum?: number);
  create(entity);
  update(id: string | number, entity);
  delete(id: string | number);
}

export class BaseRepository implements BaseOperations {
  private model: mongoose.Model<any>;
  constructor(model) {
    this.model = model;
  }
  async get(id: string | number) {
    return await this.model.findById(id);
  }

  async getAll() {
    return await this.model.find({ status: true });
  }

  async getAllStatusFalse() {
    return await this.model.find({ status: false });
  }

  async create(entity) {
    return await this.model.create(entity);
  }

  async update(id: string | number, entity) {
    return await this.model.findByIdAndUpdate(id, entity, { new: true });
  }

  async delete(id: string | number) {
    await this.model.findByIdAndDelete(id);
    return true;
  }

  async getByTipoTrabajador(tipotrabajador: string){
    return await this.model.find({ tipotrabajador, status: true });
  }

  async getByTipoDocumento(tipodocumento: string){
    return await this.model.find({ tipodocumento, status: true });
  }

  async getByYearMonth(tipotrabajador: string, anio: string, mes: string){
    return await this.model.find({ tipotrabajador, anio, mes, status: true });
  }

  async getPorAnioMesDoc(tipodocumento: string, anio: string, mes: string){
    return await this.model.find({ tipodocumento, anio, mes, status: true });
  }

}
