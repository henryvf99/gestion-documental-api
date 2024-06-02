import mongoose from "mongoose";
import mongoose_autopopulate from "mongoose-autopopulate";
import uniqueValidator from "mongoose-unique-validator";
import { AreaDoc } from './area.model';
import { CargoDoc } from './cargo.model';
import { TipotrabajadorDoc } from './tipotrabajador.model';

const { Schema } = mongoose;

interface TrabajadorAttrs {
  tipotrabajador: TipotrabajadorDoc;
  regimen: string;
  nombres: string;
  apellidos: string;
  dni: string;
  fnacimiento: string;
  area: AreaDoc;
  cargo: CargoDoc;
  fingreso: string;
  fsalida: string;
  status: boolean;
}

export interface TrabajadorDoc extends mongoose.Document {
  tipotrabajador: TipotrabajadorDoc;
  regimen: string;
  nombres: string;
  apellidos: string;
  dni: string;
  fnacimiento: string;
  area: AreaDoc;
  cargo: CargoDoc;
  fingreso: string;
  fsalida: string;
  status: boolean;
}

interface TrabajadorModel extends mongoose.Model<TrabajadorDoc> {
  build(attrs: TrabajadorAttrs): TrabajadorDoc;
}

const trabajadorSchema = new Schema(
  {
    tipotrabajador: {
      type: mongoose.Types.ObjectId,
      ref: "tipotrabajador",
      autopopulate: true,
      required: [true, "El tipo es requerido."],
    },
    regimen: {
      type: String,
      required: false
    },
    nombres: {
        type: String,
        required: [true, "El nombre es requerido."]
    },
    apellidos: {
        type: String,
        required: [true, "Los apellidos son requeridos."]
    },
    dni: {
        type: String,
        required: [true, "El dni es requerido."]
    },
    fnacimiento: {
        type: String,
        required: [true, "La fecha de nacimiento es requerida."]
    },
    area: {
      type: mongoose.Types.ObjectId,
      ref: "area",
      autopopulate: true,
      required: [true, "El area es requerida."],
    },
    cargo: {
      type: mongoose.Types.ObjectId,
      ref: "cargo",
      autopopulate: true,
      required: [true, "El cargo es requerido."],
    },
    fingreso: {
        type: String,
        required: [true, "La fecha de ingreso es requerida."]
    },
    fsalida: {
        type: String,
        required: false
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
        delete ret.__v;
      },
    },
  }
);

trabajadorSchema.plugin(mongoose_autopopulate);
trabajadorSchema.plugin(uniqueValidator, { message: "The name already exists." });
export const Trabajador = mongoose.model<TrabajadorDoc, TrabajadorModel>("trabajador", trabajadorSchema);
