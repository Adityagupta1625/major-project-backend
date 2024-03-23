import { Schema, model } from 'mongoose'
import { type UpcomingCompaniesInterface } from '../types'

const UpcomingCompaniesSchema = new Schema<UpcomingCompaniesInterface>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    doc: { type: String, required: false, default: null }
  },
  { timestamps: true }
)

const UpcomingCompaniesModel = model<UpcomingCompaniesInterface>(
  'UpcomingCompany',
  UpcomingCompaniesSchema
)

export default UpcomingCompaniesModel
