import { BaseController, HttpException, errorHandler } from '../../../utils'
import { placementFormCRUD } from '../crud'
import { Request, Response } from 'express'
import { PlacementFormInterface } from '../types'
import { google } from 'googleapis'

class PlacementFormController extends BaseController<PlacementFormInterface> {
  constructor() {
    super(placementFormCRUD)
  }

  public async addController(req: Request, res: Response): Promise<Response> {
    try {
      const SCOPES = [
        'https://www.googleapis.com/auth/forms',
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/drive.resource',
        'https://www.googleapis.com/auth/forms.body',
      ]

      const auth = new google.auth.GoogleAuth({
        credentials: {
          type: process.env.GOOGLE_FORM_TYPE,
          project_id: process.env.GOOGLE_FORM_PROJECT_ID,
          private_key_id: process.env.GOOGLE_FORM_PRIVATE_KEY_ID,
          private_key: (process.env.GOOGLE_FORM_PRIVATE_KEY as string).replace(
            /\\n/g,
            '\n'
          ),
          client_email: process.env.GOOGLE_FORM_CLIENT_EMAIL,
          client_id: process.env.GOOGLE_FORM_CLIENT_ID,
          universeDomain: process.env.GOOGLE_FORM_UNIVERSE_DOMAIN,
        },
        scopes: SCOPES,
      })

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
