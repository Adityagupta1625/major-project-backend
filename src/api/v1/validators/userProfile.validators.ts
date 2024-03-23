import { BaseValidator } from '../../../utils'

const userProfileSchema = {
  type: 'object',
  properties: {
    userId: { type: 'string', format: 'object-id' },
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
    course: { type: 'string', enum: ['BTECH', 'MTECH', 'MBA', 'MSC'] }
  },
  required: ['userId', 'name', 'department', 'batch', 'course'],
  additionalProperties: false
}

const userProfileValidator = new BaseValidator(userProfileSchema)
export { userProfileValidator }
