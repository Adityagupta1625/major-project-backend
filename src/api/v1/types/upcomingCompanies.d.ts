import { type Document } from 'mongoose'

export interface UpcomingCompaniesDTO extends Document {
  name: string
  description: string
  doc: string | null
}
