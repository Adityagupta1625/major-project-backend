import { Schema, model } from 'mongoose'
import { type UserDTO } from '../types'
import { Enum } from '../constants'

const UserSchema = new Schema<UserDTO>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Enum.Roles, required: true }
  },
  { timestamps: true }
)

const UserModel = model<UserDTO>('User', UserSchema)

export default UserModel
