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
    deadline: { type: Date, required: true }
  },
  { timestamps: true }
)

const UpcomingCompaniesModel = model<UpcomingCompaniesDTO>(
  'UpcomingCompany',
  UpcomingCompaniesSchema
)

export default UpcomingCompaniesModel
