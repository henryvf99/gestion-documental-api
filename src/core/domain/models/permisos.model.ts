import mongoose from "mongoose";
import mongoose_autopopulate from "mongoose-autopopulate";
import uniqueValidator from "mongoose-unique-validator";

const { Schema } = mongoose;

interface PermisoAttrs {
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
  status: boolean;
}

export interface PermisoDoc extends mongoose.Document {
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
  status: boolean;
}

interface PermisoModel extends mongoose.Model<PermisoDoc> {
  build(attrs: PermisoAttrs): PermisoDoc;
}

const permisoSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es requerido."]
    },
    gtrabajador: {
      type: Boolean,
      default: false
    },
    ptrabajador: {
      type: Boolean,
      default: false
    },
    utrabajador: {
      type: Boolean,
      default: false
    },
    dtrabajador: {
      type: Boolean,
      default: false
    },
    gpracticante: {
      type: Boolean,
      default: false
    },
    ppracticante: {
      type: Boolean,
      default: false
    },
    upracticante: {
      type: Boolean,
      default: false
    },
    dpracticante: {
      type: Boolean,
      default: false
    },
    gboleta: {
      type: Boolean,
      default: false
    },
    pboleta: {
      type: Boolean,
      default: false
    },
    uboleta: {
      type: Boolean,
      default: false
    },
    dboleta: {
      type: Boolean,
      default: false
    },
    gplanilla: {
      type: Boolean,
      default: false
    },
    pplanilla: {
      type: Boolean,
      default: false
    },
    uplanilla: {
      type: Boolean,
      default: false
    },
    dplanilla: {
      type: Boolean,
      default: false
    },
    gemitidos: {
      type: Boolean,
      default: false
    },
    pemitidos: {
      type: Boolean,
      default: false
    },
    uemitidos: {
      type: Boolean,
      default: false
    },
    demitidos: {
      type: Boolean,
      default: false
    },
    grecibidos: {
      type: Boolean,
      default: false
    },
    precibidos: {
      type: Boolean,
      default: false
    },
    urecibidos: {
      type: Boolean,
      default: false
    },
    drecibidos: {
      type: Boolean,
      default: false
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

permisoSchema.plugin(mongoose_autopopulate);
permisoSchema.plugin(uniqueValidator, { message: "The name already exists." });
export const Permiso = mongoose.model<PermisoDoc, PermisoModel>("permiso", permisoSchema);
