import { type Document, type ObjectId } from 'mongoose'
import { type Enum } from '../constants'

export interface UserProfileDTO extends Document {
  userId: ObjectId
  name: string
  department: Enum.Departments
  batch: string
  course: Enum.Courses
  rollNo: string
  resume: string
  marks10: number
  marks12: number
  cgpa: number
  mobileNo: string
  personalEmail: string
}
