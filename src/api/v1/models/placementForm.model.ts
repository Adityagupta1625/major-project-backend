import { Schema, model } from 'mongoose'
import { type PlacementFormInterface } from '../types'
import { Enum } from '../constants'

const PlacementFormSchema = new Schema<PlacementFormInterface>(
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

const PlacementFormModel = model<PlacementFormInterface>(
  'PlacementForm',
  PlacementFormSchema
)

export default PlacementFormModel
