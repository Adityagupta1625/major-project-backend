import { BaseValidator } from '../../../utils'

const announcementSchema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    description: { type: 'string' },
    doc: { type: ['string', 'null'] }
  },
  required: ['title', 'description'],
  additionalProperties: false
}

const announcementValidator = new BaseValidator(announcementSchema)
export { announcementValidator }
