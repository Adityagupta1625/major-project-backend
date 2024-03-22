import { BaseController, HttpException, errorHandler } from '../../../utils'
import { placementFormCRUD } from '../crud'
import { Request, Response } from 'express'
import { PlacementFormInterface } from '../types'
import { google } from 'googleapis'
import {googleAuth} from '../utils'

class PlacementFormController extends BaseController<PlacementFormInterface> {
  constructor() {
    super(placementFormCRUD)
  }

  public async addController(req: Request, res: Response): Promise<Response> {
    try {
      const auth=googleAuth()
      
      const form = google.forms({
        version: 'v1',
        auth,
      })

      const drive = google.drive({
        version: 'v3',
        auth,
      })

      const resp = await form.forms.create({
        requestBody: {
          info: {
            title: req.body.title,
          },
        },
      })

      if (
        resp === null ||
        resp.data.formId === undefined ||
        resp.data.formId === null
      )
        throw new HttpException(500, 'Unable to create Form!!')

      await drive.permissions.create({
        requestBody: {
          role: 'writer',
          emailAddress: 'guptaaditya2512@gmail.com',
          type: 'user',
        },
        fileId: resp.data.formId,
        fields: 'id',
      })

      const data = {
        ...req.body,
        formId: resp.data.formId,
      }

      await placementFormCRUD.add(data)

      return res.status(201).json({
        message: 'Form created successfully',
        url: `https://docs.google.com/forms/d/${resp.data.formId}/edit`,
      })
    } catch (e) {
      return await errorHandler(e, res)
    }
  }
}

const placementFormController = new PlacementFormController()
export default placementFormController
