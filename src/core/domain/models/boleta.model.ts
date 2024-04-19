import mongoose from "mongoose";
import mongoose_autopopulate from "mongoose-autopopulate";
import uniqueValidator from "mongoose-unique-validator";
import { AnioDoc, MesDoc, TipotrabajadorDoc, TrabajadorDoc } from '@core/domain/models';

const { Schema } = mongoose;

interface BoletaAttrs {
    anio: AnioDoc;
    mes: MesDoc;
    tipotrabajador: TipotrabajadorDoc;
    trabajador: TrabajadorDoc;
    regimen: string;
    observacion: string;
    nombrearchivo: string;
    file: Buffer;
    status: boolean;
}

export interface BoletaDoc extends mongoose.Document {
    anio: AnioDoc;
    mes: MesDoc;
    tipotrabajador: TipotrabajadorDoc;
    trabajador: TrabajadorDoc;
    regimen: string;
    observacion: string;
    nombrearchivo: string;
    file: Buffer;
    status: boolean;
}

interface BoletaModel extends mongoose.Model<BoletaDoc> {
  build(attrs: BoletaAttrs): BoletaDoc;
}

const boletaSchema = new Schema(
  {
    anio: {
        type: mongoose.Types.ObjectId,
        ref: "anio",
        autopopulate: true,
        required: [true, "El año es reuqerido."]
    },
    mes: {
        type: mongoose.Types.ObjectId,
        ref: "mes",
        autopopulate: true,
        required: [true, "El mes es requerido."]
    },
    tipotrabajador: {
      type: mongoose.Types.ObjectId,
      ref: "tipotrabajador",
      autopopulate: true,
      required: [true, "El tipotrabajador es requerido."]
    },
    trabajador: {
      type: mongoose.Types.ObjectId,
      ref: "trabajador",
      autopopulate: true,
      required: [true, "El trabajador es requerido."]
    },
    regimen: {
      type: String,
      required: false
    },
    observacion: {
        type: String,
        required: false
    },
    nombrearchivo: {
      type: String,
      required: true
    },
    file: {
        type: Buffer,
        required: [true, "El documento es requerido."]
    },
    status: {
      type: Boolean,
      default: true
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        //delete ret.file;
        delete ret.__v;
      },
    },
  }
);

boletaSchema.plugin(mongoose_autopopulate);
boletaSchema.plugin(uniqueValidator, { message: "El nombre ya existe." });
export const Boleta = mongoose.model<BoletaDoc, BoletaModel>("boleta", boletaSchema);
