import { BaseController, HttpException, errorHandler } from '../../../utils'
import { placementFormCRUD, userProfileCRUD } from '../crud'
import { type Request, type Response } from 'express'
import { type PlacementFormDTO } from '../types'
import { forms } from '@googleapis/forms'
import { drive } from '@googleapis/drive'
import { googleAuth } from '../utils'

class PlacementFormController extends BaseController<PlacementFormDTO> {
  constructor () {
    super(placementFormCRUD)
  }

  public async addController (req: Request, res: Response): Promise<Response> {
    try {
      const auth = googleAuth()

      const form = forms({
        version: 'v1',
        auth
      })

      const gdrive = drive({
        version: 'v3',
        auth
      })

      const resp = await form.forms.create({
        requestBody: {
          info: {
            title: req.body.title
          }
        }
      })

      if (resp?.data.formId === undefined || resp.data.formId === null) {
        throw new HttpException(500, 'Unable to create Form!!')
      }

      await gdrive.permissions.create({
        requestBody: {
          role: 'writer',
          emailAddress: 'guptaaditya2512@gmail.com',
          type: 'user'
        },
        fileId: resp.data.formId,
        fields: 'id'
      })

      const data = {
        ...req.body,
        formId: resp.data.formId
      }

      await placementFormCRUD.add(data)

      return res.status(201).json({
        message: 'Form created successfully',
        url: `https://docs.google.com/forms/d/${resp.data.formId}/edit`
      })
    } catch (e) {
      return await errorHandler(e, res)
    }
  }

  public async getController (req: Request, res: Response): Promise<Response> {
    try {
      const userProfile = await userProfileCRUD.find({
        userId: req.query.userId
      })

      if (userProfile === null) { throw new HttpException(404, 'User Profile Not Updated!!') }

      const department = userProfile.department
      const course = userProfile.course
      const today = new Date()

      if (department === null || course === null) { throw new HttpException(404, 'User Profile Not Updated!!') }

      const data = await this.CRUDService.findAll({
        departments: { $in: [department] },
        courses: { $in: [course] },
        deadline: { $gte: today }
      })

      return res.status(200).json(data)
    } catch (e) {
      return await errorHandler(e, res)
    }
  }
}

const placementFormController = new PlacementFormController()
export default placementFormController
