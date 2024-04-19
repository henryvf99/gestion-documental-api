import mongoose from "mongoose";
import mongoose_autopopulate from "mongoose-autopopulate";
import uniqueValidator from "mongoose-unique-validator";
import { AnioDoc, MesDoc, TipodocumentoDoc } from '@core/domain/models';

const { Schema } = mongoose;

interface RecibidosAttrs {
    anio: AnioDoc;
    mes: MesDoc;
    tipodocumento: TipodocumentoDoc;
    codigo: string;
    asunto: string;
    fecharecepcion: string;
    nombrearchivo: string;
    file: Buffer;
    status: boolean;
}

export interface RecibidosDoc extends mongoose.Document {
    anio: AnioDoc;
    mes: MesDoc;
    tipodocumento: TipodocumentoDoc;
    codigo: string;
    asunto: string;
    fecharecepcion: string;
    nombrearchivo: string;
    file: Buffer;
    status: boolean;
}

interface RecibidosModel extends mongoose.Model<RecibidosDoc> {
  build(attrs: RecibidosAttrs): RecibidosDoc;
}

const recibidosSchema = new Schema(
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
    asunto: {
        type: String,
        required: [true, "El asunto es requerido."]
    },
    fecharecepcion: {
        type: String,
        required: [true, "El fecharecepcion es requerido."]
    },
    nombrearchivo: {
      type: String,
      required: true
    },
    file: {
        type: Buffer,
        required: [true, "El file es requerido."]
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
        delete ret.file;
        delete ret.__v;
      },
    },
  }
);

recibidosSchema.plugin(mongoose_autopopulate);
recibidosSchema.plugin(uniqueValidator, { message: "El nombre ya existe." });
export const Recibidos = mongoose.model<RecibidosDoc, RecibidosModel>("recibidos", recibidosSchema);
