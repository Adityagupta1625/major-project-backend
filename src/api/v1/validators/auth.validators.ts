import { BaseValidator } from '../../../utils'

const authSchema = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string' }
  },
  required: ['email', 'password'],
  additionalProperties: false
}

const registerSchema = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string' },
    role: { type: 'string', enum: ['Student', 'PR', 'TPO'] }
  },
  required: ['email', 'password', 'role'],
  additionalProperties: false
}

const authValidator = new BaseValidator(authSchema)
const registerValidator = new BaseValidator(registerSchema)

export { authValidator, registerValidator }
