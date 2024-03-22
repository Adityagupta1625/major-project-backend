import { Document,ObjectId } from 'mongoose'
import { Enum } from '../constants'

export interface PlacementFormInterface extends Document {
  title: string
  formId: string
  courses: Enum.Courses[]
  departments: Enum.Departments[]
  deadline: Date
}
