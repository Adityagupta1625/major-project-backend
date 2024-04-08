import Ajv, { type Schema } from 'ajv'
import addFormats from 'ajv-formats'
import { type NextFunction, type Request, type Response } from 'express'
import HttpException from './HttpException'

export class BaseValidator {
  private readonly schemaObj: Schema

  constructor (schemaObj: Schema) {
    this.schemaObj = schemaObj
  }

  public async validateInput (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | any> {
    try {
      const ajv = new Ajv()
      addFormats(ajv, { mode: 'full' })
      const validate = ajv.compile(this.schemaObj)
      const valid = validate(req.body)
      if (valid) next()
      else {
        if (validate.errors === null || validate.errors === undefined) {
          throw new HttpException(400, 'Validation error')
        }

        const errorMessage = validate.errors
          .map((error) => {
            return `${error.message}`
          })
          .join(', ')

        throw new HttpException(400, errorMessage)
      }
    } catch (e: any) {
      console.log(e)
      return res
        .status(e?.errorCode ?? 500)
        .json({ message: e?.message ?? e ?? 'Something Went Wrong!!' })
    }
  }
}
