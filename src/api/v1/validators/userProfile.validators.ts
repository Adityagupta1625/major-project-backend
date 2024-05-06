import { BaseValidator } from '../../../utils'

const userProfileSchema = {
  type: 'object',
  properties: {
   
    name: { type: ['string', 'null'] },
    rollNo: { type: ['string', 'null'] },
    department: {
      type: ['string', 'null'],
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
        'BT',
      ],
    },
    batch: { type: ['string', 'null'] },
    course: {
      type: ['string', 'null'],
      enum: ['B.TECH', 'M.TECH', 'MBA', 'M.SC'],
    },
    resume: { type: ['string', 'null'] },
    marks10: { type: ['number', 'null'] },
    marks12: { type: ['number', 'null'] },
    cgpa: { type: ['number', 'null'] },
    mobileNo: { type: ['string', 'null'] },
    personalEmail: { type: ['string', 'null'] },
    officialEmail: { type: ['string', 'null'] },
    userId: {type: 'string'}
  },
  required: [
    'name',
    'rollNo',
    'department',
    'batch',
    'course',
    'resume',
    'marks10',
    'marks12',
    'cgpa',
    'mobileNo',
    'personalEmail',
    'officialEmail',
  ],
  additionalProperties: false,
}

const userProfileValidator = new BaseValidator(userProfileSchema)
export { userProfileValidator }
