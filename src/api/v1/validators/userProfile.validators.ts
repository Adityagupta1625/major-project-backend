import { BaseValidator } from '../../../utils'

const userProfileSchema = {
  type: 'object',
  properties: {
    userId: { type: 'string' },
    name: { type: 'string' },
    department: {
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
    batch: { type: 'string' },
    course: { type: 'string', enum: ['B.TECH', 'M.TECH', 'MBA', 'M.SC'] },
    rollNo: { type: 'string' }
  },

  additionalProperties: false
}

const userProfileValidator = new BaseValidator(userProfileSchema)
export { userProfileValidator }
