import ajv, { Schema } from 'ajv'
import { type NextFunction, type Request, type Response } from 'express'
import HttpException from './HttpException'

export class BaseValidator {
  private readonly schemaObj: Schema

  constructor(schemaObj: Schema) {
    this.schemaObj = schemaObj
  }

  public async validateInput(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | any> {
    try {
      const Ajv=new ajv()

      const validate=Ajv.compile(this.schemaObj)
      const valid=validate(req.body.data)
      if(valid) next()

      else throw new HttpException(400,validate.errors)

    } catch (e: any) {
      return res.status(e?.errorCode ?? 500).json({ message: e })
    }
  }
}
