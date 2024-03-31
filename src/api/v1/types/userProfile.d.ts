import { type Document, type ObjectId } from 'mongoose'
import { type Enum } from '../constants'

export interface UserProfileInterface extends Document {
  userId: ObjectId
  name: string
  department: Enum.Departments
  batch: string
  course: Enum.Courses
  rollNo: string
}
