import mongoose from "mongoose";
import mongoose_autopopulate from "mongoose-autopopulate";
import uniqueValidator from "mongoose-unique-validator";
import { AnioDoc, MesDoc, TipodocumentoDoc } from '@core/domain/models';

const { Schema } = mongoose;

interface EmitidosAttrs {
    anio: AnioDoc;
    mes: MesDoc;
    tipodocumento: TipodocumentoDoc;
    codigo: string;
    destinatario: string;
    asunto: string;
    fechaemision: string;
    nombrearchivo: string;
    file: Buffer;
    nombrearchivo2: string;
    file2: Buffer;
    status: boolean;
}

export interface EmitidosDoc extends mongoose.Document {
    anio: AnioDoc;
    mes: MesDoc;
    tipodocumento: TipodocumentoDoc;
    codigo: string;
    destinatario: string;
    asunto: string;
    fechaemision: string;
    nombrearchivo: string;
    file: Buffer;
    nombrearchivo2: string;
    file2: Buffer;
    status: boolean;
}

interface EmitidosModel extends mongoose.Model<EmitidosDoc> {
  build(attrs: EmitidosAttrs): EmitidosDoc;
}

const emitidosSchema = new Schema(
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
    tipodocumento: {
      type: mongoose.Types.ObjectId,
      ref: "tipodocumento",
      autopopulate: true,
      required: [true, "El tipodocumento es requerido."]
    },
    codigo: {
        type: String,
        unique: true,
        required: [true, "El codigo es requerido."]
    },
    destinatario: {
        type: String,
        required: [true, "El destinatario es requerido."]
    },
    asunto: {
        type: String,
        required: [true, "El asunto es requerido."]
    },
    fechaemision: {
        type: String,
        required: [true, "El fechaemision es requerido."]
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
      required: true
    },
    file2: {
        type: Buffer,
        required: [true, "El file2 es requerido."]
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

emitidosSchema.plugin(mongoose_autopopulate);
emitidosSchema.plugin(uniqueValidator, { message: "El nombre ya existe." });
export const Emitidos = mongoose.model<EmitidosDoc, EmitidosModel>("emitidos", emitidosSchema);
