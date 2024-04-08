import { Schema, model } from 'mongoose'
import { type AnnouncementDTO } from '../types'

const AnnouncementSchema = new Schema<AnnouncementDTO>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    doc: { type: String, required: false, default: null }
  },
  { timestamps: true }
)

const AnnouncementModel = model<AnnouncementDTO>(
  'Announcement',
  AnnouncementSchema
)

export default AnnouncementModel
