import mongoose, { Document, Model, Schema, Types } from 'mongoose'
import {IRol} from './rol'

export interface IUser extends Document {
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
  id_rol: Types.ObjectId | IRol
  is_active: boolean
  used_tokens: number
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    id_rol: { type: Schema.Types.ObjectId, ref: 'Rol', required: true },
    is_active: { type: Boolean, default: true },
    used_tokens: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
