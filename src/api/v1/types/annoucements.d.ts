import { type Document } from 'mongoose'

export interface AnnouncementDTO extends Document {
  title: string
  description: string
  doc: string | null
}
