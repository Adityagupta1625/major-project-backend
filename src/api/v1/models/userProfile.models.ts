import { Schema, model } from 'mongoose'
import { type UserProfileDTO } from '../types'
import { Enum } from '../constants'

const UserProfileSchema = new Schema<UserProfileDTO>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, default: null },
    rollNo: { type: String, default: null },
    department: { type: String, enum: Enum.Departments, default: null },
    batch: { type: String, default: null },
    course: { type: String, enum: Enum.Courses, defaul: null }
  },
  { timestamps: true }
)

const UserProfileModel = model<UserProfileDTO>('UserProfile', UserProfileSchema)

export default UserProfileModel
