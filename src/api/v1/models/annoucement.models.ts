import { Schema, model } from 'mongoose';
import { AnnouncementInterface } from '../types'; 

const AnnouncementSchema = new Schema<AnnouncementInterface>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    doc: {type: String, required: false, default: null},
  },
  { timestamps: true }
);

const AnnouncementModel = model<AnnouncementInterface>('Announcement', AnnouncementSchema);

export default AnnouncementModel;
