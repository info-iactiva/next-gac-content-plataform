import mongoose, { Document, Model, Schema } from 'mongoose'

export interface IPlan extends Document {
  tokens: number
  ilimit_tokesn: boolean
  price: number
  duration: '1 día' | '1 semana' | '1 mes' | '1 año' // esto asegura los valores válidos en TypeScript también
  nombre:string
}

const PlanSchema = new Schema<IPlan>(
  {
    nombre: { type: String, required: true , unique: true},
    tokens: { type: Number, required: true },
    ilimit_tokesn: { type: Boolean, required: true },
    price: { type: Number, required: true },
    duration: {
      type: String,
      enum: ['1 día', '1 semana', '1 mes', '1 año'], // valores permitidos
      required: true,
    },
  },
  { timestamps: true }
)

export const Plan: Model<IPlan> =
  mongoose.models.Plan || mongoose.model<IPlan>('Plan', PlanSchema)
