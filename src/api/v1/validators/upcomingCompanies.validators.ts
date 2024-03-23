import { BaseValidator } from "../../../utils"

const upcomingCompaniesSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    description: { type: 'string' },
    doc: { type: ['string', 'null'] },
  },
  required: ['name', 'description'],
  additionalProperties: false,
}

const upcomingCompaniesValidator=new BaseValidator(upcomingCompaniesSchema)
export{
    upcomingCompaniesValidator
}