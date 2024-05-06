import { BaseController, HttpException, errorHandler } from '../../../utils'
import { submissionsCRUD, userProfileCRUD } from '../crud'
import { type SubmissionsDTO } from '../types'
import { type Request, type Response } from 'express'
import mongoose, { isValidObjectId, ObjectId } from 'mongoose'

class SubmissionController extends BaseController<SubmissionsDTO> {
  constructor() {
    super(submissionsCRUD)
  }

  public async addController(req: Request, res: Response): Promise<Response> {
    try {
      let userId: string | ObjectId = req.query.userId as string
      let companyId: string | ObjectId = req.body.companyId as string

      if (!isValidObjectId(userId) || !isValidObjectId(companyId))
        throw new HttpException(400, 'Invalid data')

      const userProfile = await userProfileCRUD.find({ userId: userId })

      if (userProfile === null)
        throw new HttpException(409, 'Please Fill Complete Details')

      const isNull = Object.values(userProfile).some((value) => value === null)

      if (isNull)
        throw new HttpException(409, 'Please Complete Your Profile First')

      await submissionsCRUD.add({
        companyId: companyId,
        userId: userId,
      })

      return res.status(201).json({ message: 'Submitted Successfully' })
    } catch (e) {
      return await errorHandler(e, res)
    }
  }

  public async getByUserId(req: Request, res: Response): Promise<Response> {
    try {
      if (
        typeof req.query.userId !== 'string' &&
        !isValidObjectId(req.query.userId)
      ) {
        throw new HttpException(400, 'Invalid user Id')
      }

      const data = await submissionsCRUD.getAppliedCompaniesByUser(
        req.query.userId as string
      )

      const resp: any=[]
      data.forEach((value)=>{
        resp.push({
          companyName: value.companyDetails.name,
          category: value.companyDetails.category,
          ctc: value.companyDetails.ctc,
          status: value.status
        })
      })

      return res.status(200).json(resp)
    } catch (e) {
      return await errorHandler(e, res)
    }
  }

  public async getByCompanyId(req: Request, res: Response): Promise<Response> {
    try {
      if (
        typeof req.query.companyId !== 'string' &&
        !isValidObjectId(req.query.companyId)
      ) {
        throw new HttpException(400, 'Invalid company Id')
      }

      const data = await submissionsCRUD.getSubmissionDetailsByCompanyId(
        req.query.companyId as string
      )

      const resp: any = []
      data.forEach((value) => {
        resp.push({
          _id: value._id,
          name: value.userProfile.name,
          department: value.userProfile.department,
          course: value.userProfile.course,
          personalEmail: value.userProfile.personalEmail,
          officialEmail: value.userProfile.officialEmail,
          batch: value.userProfile.batch,
          marks10: value.userProfile.marks10,
          marks12: value.userProfile.marks12,
          cgpa: value.userProfile.cgpa,
          mobileNo: value.userProfile.mobileNo,
          resume: value.userProfile.resume,
          rollNo: value.userProfile.rollNo,
          status: value.status,
        })
      })

      return res.status(200).json(resp)
    } catch (e) {
      return await errorHandler(e, res)
    }
  }

  public async getAllSubmissionsByCompany(req: Request, res: Response) {
    try {
      const data = await submissionsCRUD.getAllSubmissionsByCompany()
      return res.status(200).json(data)
    } catch (e) {
      return await errorHandler(e, res)
    }
  }

  public async addCommentController(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const commentDTO: {
        comment: string
        id: string
      } = req.body

      const data = await this.CRUDService.update(
        { _id: new mongoose.Types.ObjectId(commentDTO.id) },
        {
          $push: {
            comments: commentDTO.comment,
          },
        }
      )

      return res.status(200).json(data)
    } catch (e) {
      return await errorHandler(e, res)
    }
  }
}

const submissionController = new SubmissionController()
export default submissionController
