import { HttpException, errorHandler } from '../../../utils'
import { type Request, type Response } from 'express'
import { forms } from '@googleapis/forms'
import { googleAuth } from '../utils'

class FormResponsesController {
  public async getAllController (
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      if (typeof req.query.formId !== 'string') {
        throw new HttpException(400, 'FormId should be defined')
      }

      const auth = googleAuth()

      const allResponses = await forms({
        version: 'v1',
        auth
      }).forms.responses.list({
        formId: req.query.formId
      })

      return res.status(200).json(allResponses.data)
    } catch (e) {
      return await errorHandler(e, res)
    }
  }

  public async getByResponseIdController (
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      if (typeof req.query.formId !== 'string') {
        throw new HttpException(400, 'FormId should be defined')
      }

      if (typeof req.params.id === 'string') {
        throw new HttpException(400, 'Response Id should be defined')
      }

      const auth = googleAuth()

      const allResponses = await forms({
        version: 'v1',
        auth
      }).forms.responses.get({
        responseId: req.params.id,
        formId: req.query.formId
      })

      //  https://docs.google.com/forms/d/e/{FORM_ID}/viewform?edit2={RESPONSE_ID}

      return res.status(200).json(allResponses.data)
    } catch (e) {
      return await errorHandler(e, res)
    }
  }
}

const formResponseController = new FormResponsesController()
export default formResponseController
