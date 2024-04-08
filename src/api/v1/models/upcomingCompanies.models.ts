import { Schema, model } from 'mongoose'
import { type UpcomingCompaniesDTO } from '../types'

const UpcomingCompaniesSchema = new Schema<UpcomingCompaniesDTO>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    doc: { type: String, required: false, default: null }
  },
  { timestamps: true }
)

const UpcomingCompaniesModel = model<UpcomingCompaniesDTO>(
  'UpcomingCompany',
  UpcomingCompaniesSchema
)

export default UpcomingCompaniesModel
