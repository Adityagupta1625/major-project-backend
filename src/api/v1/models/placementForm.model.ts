import { Schema, model } from 'mongoose'
import { type PlacementFormDTO } from '../types'
import { Enum } from '../constants'

const PlacementFormSchema = new Schema<PlacementFormDTO>(
  {
    title: { type: String, required: true },
    formId: { type: String, required: true },
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

const PlacementFormModel = model<PlacementFormDTO>(
  'PlacementForm',
  PlacementFormSchema
)

export default PlacementFormModel
