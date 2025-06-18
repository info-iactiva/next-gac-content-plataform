import mongoose, { Document, Model, Schema } from 'mongoose'

export interface IRol extends Document {
  name: string  
}

const RolSchema = new Schema<IRol>(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
)

export const Rol: Model<IRol> = mongoose.models.Rol || mongoose.model<IRol>('Rol', RolSchema)
