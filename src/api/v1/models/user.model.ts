import { Schema, model } from 'mongoose'
import { type UserInterface } from '../types'
import { Enum } from '../constants'

const UserSchema = new Schema<UserInterface>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Enum.Roles, required: true }
  },
  { timestamps: true }
)

const UserModel = model<UserInterface>('User', UserSchema)

export default UserModel
