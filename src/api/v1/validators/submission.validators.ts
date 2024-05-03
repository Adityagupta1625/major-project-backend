import { BaseValidator } from '../../../utils'

const submissionSchema = {
  type: 'object',
  properties: {
    companyId: { type: 'string' },
  },
  additionalProperties: false,
  required: ['companyId'],
}

const commentSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    comment: { type: 'string' },
  },
  additionalProperties: false,
  required: ['comment'],
}

const submissionValidator = new BaseValidator(submissionSchema)
const commentValidator = new BaseValidator(commentSchema)

export { submissionValidator, commentValidator }
