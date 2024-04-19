import mongoose from "mongoose";
import mongoose_autopopulate from "mongoose-autopopulate";
import uniqueValidator from "mongoose-unique-validator";
import { AnioDoc, MesDoc, TipotrabajadorDoc } from '@core/domain/models';
const { Schema } = mongoose;

interface PlanillaAttrs {
    anio: AnioDoc;
    mes: MesDoc;
    tipotrabajador: TipotrabajadorDoc;
    regimen: string;
    observacion: string;
    nombrearchivo: string;
    file: Buffer;
    status: boolean;
}

export interface PlanillaDoc extends mongoose.Document {
    anio: AnioDoc;
    mes: MesDoc;
    tipotrabajador: TipotrabajadorDoc;
    regimen: string;
    observacion: string;
    nombrearchivo: string;
    file: Buffer;
    status: boolean;
}

interface PlanillaModel extends mongoose.Model<PlanillaDoc> {
  build(attrs: PlanillaAttrs): PlanillaDoc;
}

const planillaSchema = new Schema(
  {
    anio: {
        type: mongoose.Types.ObjectId,
        ref: "anio",
        autopopulate: true,
        required: [true, "El año es reuqerido."],
    },
    mes: {
        type: mongoose.Types.ObjectId,
        ref: "mes",
        autopopulate: true,
        required: [true, "El mes es requerido."],
    },
    tipotrabajador: {
      type: mongoose.Types.ObjectId,
      ref: "tipotrabajador",
      autopopulate: true,
      required: [true, "El tipotrabajador es requerido."],
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
        delete ret.file;
        delete ret.__v;
      },
    },
  }
);

planillaSchema.plugin(mongoose_autopopulate);
planillaSchema.plugin(uniqueValidator, { message: "El nombre ya existe." });
export const Planilla = mongoose.model<PlanillaDoc, PlanillaModel>("planilla", planillaSchema);
