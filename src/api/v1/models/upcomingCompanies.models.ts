import { Schema, model } from 'mongoose'
import { type UpcomingCompaniesDTO } from '../types'
import { Enum } from '../constants'

const UpcomingCompaniesSchema = new Schema<UpcomingCompaniesDTO>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    doc: { type: String, required: false, default: null },
    courses: {
      type: [{ type: String, enum: Enum.Courses }],
      default: []
    },
    departments: {
      type: [{ type: String, enum: Enum.Departments }],
      default: []
    },
    deadline: { type: Date, required: true },
    category: {type: String, enum: Enum.OfferCategory, required: true},
    offer: {type: String,enum: Enum.OfferType,required: true},
    batch: {type: String,required: true},
    ctc: {type: String,required: true}
  },
  { timestamps: true }
)

const UpcomingCompaniesModel = model<UpcomingCompaniesDTO>(
  'UpcomingCompany',
  UpcomingCompaniesSchema
)

export default UpcomingCompaniesModel
