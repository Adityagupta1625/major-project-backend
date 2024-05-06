import { CRUDBase, HttpException } from '../../../utils'
import { SubmissionsModel } from '../models'
import { SubmissionDetailsWithCompany, type SubmissionsDTO } from '../types'
import { ObjectId } from 'mongoose'
import { SubmissionDetailsWithUser,SubmissionDetailsByCompany } from '../types'

class SubmissionsCRUD extends CRUDBase<SubmissionsDTO> {
  constructor() {
    super(SubmissionsModel)
  }

  public async getSubmissionDetailsByCompanyId(
    companyId: ObjectId
  ): Promise<SubmissionDetailsWithCompany[]> {
    try {
      const data = await this.baseModel.aggregate([
        {
          $match: {
            companyId: companyId,
          },
        },
        {
          $lookup: {
            from: 'userprofile',
            localField: 'userId',
            foreignField: 'userId',
            as: 'userprofile',
          },
        },
        {
          $unwind: '$userprofile',
        },
        {
          $project: {
            userprofile: 1,
            status: 1,
            comments: 1,
          },
        },
      ])

      return data
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  public async getAppliedCompaniesByUser(
    userId: ObjectId
  ): Promise<SubmissionDetailsWithUser[]> {
    try {
      const data = await this.baseModel.aggregate([
        {
          $match: {
            userId: userId,
          },
        },
        {
          $lookup: {
            from: 'upcomingcompanies',
            localField: 'companyId',
            foreignField: '_id',
            as: 'companyDetails',
          },
        },
        {
          $unwind: '$companyDetails',
        },
        {
          $project: {
            companyDetails: 1,
            status: 1,
            comments: 1,
          },
        },
      ])

      return data
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  public async getAllSubmissionsByCompany(): Promise<SubmissionDetailsByCompany[]> {
    try {
      const data = await this.baseModel.aggregate([
        {
          $group:{
            _id: '$companyId',
            companyId: { $first: '$companyId' },
            submissions: {$sum: 1},
          }
        },
        {
          $lookup: {
            from: 'upcomingcompanies',
            localField: 'companyId',
            foreignField: '_id',
            as: 'companyDetails',
          },
        },
        {
          $unwind: '$companyDetails',
        },
        {
          $project: {
            companyName: '$companyDetails.name',
            deadline: '$companyDetails.deadline',
            submissions: 1
          },
        },
      ])

      return data
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

}

const submissionsCRUD = new SubmissionsCRUD()
export default submissionsCRUD
