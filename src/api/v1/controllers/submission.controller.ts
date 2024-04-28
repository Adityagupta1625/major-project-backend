import { BaseController, HttpException, errorHandler } from '../../../utils'
import { submissionsCRUD } from '../crud'
import { type SubmissionsDTO } from '../types'
import { Request, Response } from 'express'
import mongoose,{isValidObjectId} from 'mongoose'

class SubmissionController extends BaseController<SubmissionsDTO> {
  constructor() {
    super(submissionsCRUD)
  }

  public async getByUserId(req: Request, res: Response): Promise<Response> {
    try {
      if(typeof req.query.userId!=='string' && !isValidObjectId(req.query.userId))
        throw new HttpException(400, 'Invalid user Id')

      const data = await this.CRUDService.find({ userId: new mongoose.Types.ObjectId(req.query.userId as string)})
      return res.status(200).json(data)
    } catch (e) {
      return await errorHandler(e, res)
    }
  }

  public async getByCompanyId(req: Request, res: Response): Promise<Response> {
    try {

      if(typeof req.query.companyId!=='string' && !isValidObjectId(req.query.companyId))
        throw new HttpException(400, 'Invalid company Id')

      const data = await this.CRUDService.find({
        companyId: new mongoose.Types.ObjectId(req.query.companyId as string),
      })

      return res.status(200).json(data)
    } catch (e) {
      return await errorHandler(e, res)
    }
  }

  public async addCommentController(req: Request, res: Response): Promise<Response> {
    try {

      const commentDTO: {
        comment: string
        id: string
      }=req.body

      const data = await this.CRUDService.update({_id: new mongoose.Types.ObjectId(commentDTO.id)},{
        $push:{
          comments: commentDTO.comment
        }
      })

      return res.status(200).json(data)
    } catch (e) {
      return await errorHandler(e, res)
    }
  }

  

}

const submissionController = new SubmissionController()
export default submissionController
