import { Schema, model } from 'mongoose'
import { type UserProfileInterface } from '../types'
import { Enum } from '../constants'

const UserProfileSchema = new Schema<UserProfileInterface>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    department: { type: String, enum: Enum.Departments, required: true },
    batch: { type: String, required: true },
    course: { type: String, enum: Enum.Courses, required: true }
  },
  { timestamps: true }
)

const UserProfileModel = model<UserProfileInterface>(
  'UserProfile',
  UserProfileSchema
)

export default UserProfileModel
