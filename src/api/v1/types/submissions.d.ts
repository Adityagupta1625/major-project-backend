import { type Document, type ObjectId } from 'mongoose'
import { type Enum } from '../constants'

export interface SubmissionsDTO extends Document {
  companyId: ObjectId
  userId: ObjectId
  status: Enum.FormStatus
  comments: string[]
}
