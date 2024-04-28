import { type Document } from 'mongoose'
import { type Enum } from '../constants'

export interface UpcomingCompaniesDTO extends Document {
  name: string
  description: string
  doc: string | null
  courses: Enum.Courses[]
  departments: Enum.Departments[]
  deadline: Date
}
