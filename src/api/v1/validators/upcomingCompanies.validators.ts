import { BaseValidator } from '../../../utils'

const upcomingCompaniesSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    description: { type: 'string' },
    doc: { type: ['string', 'null'] },
    courses: {
      type: 'array',
      items: { type: 'string', enum: ['B.TECH', 'M.TECH', 'MBA', 'M.SC'] }
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
      }
    },
    deadline: { type: 'string', format: 'date-time' },
    batch: {type: 'string'},
    category: {type: 'string',enum: ['Dream','Super Dream','Below Dream']},
    offer: {
      type: 'string',
      enum: ['6 Months Internship','2 Months Internship','Full Time','PPO']
    },
    ctc: {type: 'string'}
  },
  required: ['name', 'description', 'deadline','batch','offer','category','ctc'],
  additionalProperties: false
}

const upcomingCompaniesValidator = new BaseValidator(upcomingCompaniesSchema)
export { upcomingCompaniesValidator }
