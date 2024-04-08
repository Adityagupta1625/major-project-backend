import { type Document } from 'mongoose'
import { type Enum } from '../constants'

export interface PlacementFormDTO extends Document {
  title: string
  formId: string
  courses: Enum.Courses[]
  departments: Enum.Departments[]
  deadline: Date
}
