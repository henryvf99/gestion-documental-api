import mongoose from "mongoose";
import mongoose_autopopulate from "mongoose-autopopulate";
import uniqueValidator from "mongoose-unique-validator";
import { AreaDoc } from '@core/domain/models';

const { Schema } = mongoose;

interface PracticantesAttrs {
    nombre: string;
    apellidos: string;
    universidad: string;
    horapracticas: string;
    area: AreaDoc;
    carrera: string;
    fingreso: string;
    fsalida: string;
    nombrearchivo: string;
    file: Buffer;
    nombrearchivo2: string;
    file2: Buffer;
    status: boolean;
}

export interface PracticantesDoc extends mongoose.Document {
    nombre: string;
    apellidos: string;
    universidad: string;
    horapracticas: string;
    area: AreaDoc;
    carrera: string;
    fingreso: string;
    fsalida: string;
    nombrearchivo: string;
    file: Buffer;
    nombrearchivo2: string;
    file2: Buffer;
    status: boolean;
}

interface PracticantesModel extends mongoose.Model<PracticantesDoc> {
  build(attrs: PracticantesAttrs): PracticantesDoc;
}

const practicantesSchema = new Schema(
  {
    nombre: {
        type: String,
        required: [true, "El campo nombre es requerido."]
    },
    apellidos: {
        type: String,
        required: [true, "El campo apellido es requerido."]
    },
    universidad: {
        type: String,
        required: [true, "El campo universidad es requerido."]
    },
    horapracticas: {
        type: String,
        required: [true, "El campo horas de practicas es requerido."]
    },
    area: {
      type: mongoose.Types.ObjectId,
      ref: "area",
      autopopulate: true,
      required: [true, "El campo area es requerido."],
    },
    carrera: {
        type: String,
        required: [true, "El campo carrera es requerido."]
    },
    fingreso: {
        type: String,
        required: [true, "El campo fecha de ingreso es requerido."]
    },
    fsalida: {
        type: String,
        required: false
    },
    nombrearchivo: {
      type: String,
      required: false
    },
    file: {
        type: Buffer,
        required: false
    },
    nombrearchivo2: {
      type: String,
      required: false
    },
    file2: {
        type: Buffer,
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

practicantesSchema.plugin(mongoose_autopopulate);
practicantesSchema.plugin(uniqueValidator, { message: "El nombre ya existe." });
export const Practicantes = mongoose.model<PracticantesDoc, PracticantesModel>("practicantes", practicantesSchema);
