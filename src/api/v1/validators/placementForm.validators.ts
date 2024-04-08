import { BaseValidator } from '../../../utils'

const placementFormSchema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    formId: { type: 'string' },
    courses: {
      type: 'array',
      items: { type: 'string', enum: ['B.TECH', 'M.TECH', 'MBA', 'M.SC'] },
      default: []
    },
    departments: {
      type: 'array',
      items: {
        type: 'string',
        enum: [
          'CSE',
          'ECE',
          'ICE',
          'IT',
          'ME',
          'IP',
          'EE',
          'CE',
          'CH',
          'TT',
          'BT'
        ]
      },
      default: []
    },
    deadline: { type: 'string', format: 'date-time' }
  },
  required: ['title', 'deadline'],
  additionalProperties: false
}

const placementFormValidator = new BaseValidator(placementFormSchema)
export { placementFormValidator }
