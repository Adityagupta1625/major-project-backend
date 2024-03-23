import { type Document } from 'mongoose'

export interface UpcomingCompaniesInterface extends Document {
  name: string
  description: string
  doc: string | null
}
