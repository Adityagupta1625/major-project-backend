import { Schema, model } from 'mongoose'
import { type SubmissionsDTO } from '../types'
import { Enum } from '../constants'

const SubmissionsSchema = new Schema<SubmissionsDTO>(
  {
    companyId: {type: Schema.Types.ObjectId, ref: 'upcomingcompanies',required: true},
    userId: {type: Schema.Types.ObjectId, required: true},
    status: {type: String, required: true,enum: Enum.FormStatus},
    comments: {type: [String], required: false,default: []}
  },
  { timestamps: true }
)

const SubmissionsModel = model<SubmissionsDTO>(
  'Submissions',
  SubmissionsSchema
)

export default SubmissionsModel
