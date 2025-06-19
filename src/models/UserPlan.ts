import mongoose, { Document, Model, Schema, Types } from 'mongoose'

import { IPlan } from './plan'

export interface IUserPlan extends Document {
  id_user: Types.ObjectId
  id_plan: Types.ObjectId | IPlan  // 👈 esto permite que esté poblado
  start_date: Date
  end_date: Date
  active: boolean
}

const UserPlanSchema = new Schema<IUserPlan>(
  {
    id_user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    id_plan: { type: Schema.Types.ObjectId, ref: 'Plan', required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export const UserPlan: Model<IUserPlan> = mongoose.models.UserPlan || mongoose.model<IUserPlan>('UserPlan', UserPlanSchema)


// const userPlan = await UserPlan.create({
//   id_user: someUserId,
//   id_plan: somePlanId,
//   start_date: new Date(),
//   end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días
// })
