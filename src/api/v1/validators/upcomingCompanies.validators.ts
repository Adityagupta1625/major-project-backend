import { BaseValidator } from '../../../utils'

const upcomingCompaniesSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    description: { type: 'string' },
    doc: { type: ['string', 'null'] },
    courses: {
      type: 'array',
      items: { type: 'string', enum: ['B.TECH', 'M.TECH', 'MBA', 'M.SC'] }, 
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
        ],
      },
    },
    deadline: { type: 'string', format: 'date-time' },
  },
  required: ['name', 'description', 'deadline'],
  additionalProperties: false,
}

const upcomingCompaniesValidator = new BaseValidator(upcomingCompaniesSchema)
export { upcomingCompaniesValidator }
