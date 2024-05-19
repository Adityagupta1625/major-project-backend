import { CRUDBase, HttpException } from '../../../utils'
import { SubmissionsModel } from '../models'
import { SubmissionDetailsWithCompany, type SubmissionsDTO } from '../types'
import {  Types } from 'mongoose'
import { SubmissionDetailsWithUser, SubmissionDetailsByCompany } from '../types'

class SubmissionsCRUD extends CRUDBase<SubmissionsDTO> {
  constructor() {
    super(SubmissionsModel)
  }

  public async getSubmissionDetailsByCompanyId(
    companyId: string
  ): Promise<SubmissionDetailsWithUser[]> {
    try {
      const data = await this.baseModel.aggregate([
        {
          $match: {
            companyId: new Types.ObjectId(companyId),
          },
        },
        {
          $lookup: {
            from: 'userprofiles',
            localField: 'userId',
            foreignField: 'userId',
            as: 'userProfile',
          },
        },
        {
          $unwind: '$userProfile',
        },
        {
          $project: {
            _id: 1,
            userProfile: 1,
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
    userId: string,
    page: number,
    limit: number
  ): Promise<{ data: SubmissionDetailsWithCompany[]; totalPages: number }> {
    try {
      const resp = await this.baseModel.aggregate([
        {
          $match: {
            userId: new Types.ObjectId(userId),
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
          $facet: {
            totalPages: [
              {
                $group: {
                  _id: null,
                  total: { $sum: 1 },
                },
              },
              {
                $project: {
                  _id: 0,
                  total: {
                    $ceil: {
                      $divide: ['$total', limit],
                    },
                  },
                },
              },
            ],
            data: [
              {
                $sort: {
                  createdAt: 1,
                },
              },
              {
                $project: {
                  companyDetails: 1,
                  status: 1,
                  comments: 1,
                },
              },
              {
                $skip: (page - 1) * limit,
              },
              {
                $limit: limit,
              },
            ],
          },
        },
        {
          $project: {
            data: '$data',
            totalPages: '$totalPages.total',
          },
        },
        {
          $unwind: '$totalPages',
        },
      ])

      if (resp.length === 0) {
        return {
          data: [],
          totalPages: 0,
        }
      }

      return {
        data: resp[0].data,
        totalPages: resp[0].totalPages,
      }
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  public async getAllSubmissionsByCompany(
    page: number,
    limit: number
  ): Promise<{
    totalPages: number
    data: SubmissionDetailsByCompany[]
  }> {
    try {
      const data = await this.baseModel.aggregate([
        {
          $group: {
            _id: '$companyId',
            companyId: { $first: '$companyId' },
            submissions: { $sum: 1 },
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
          $facet: {
            totalPages: [
              {
                $group: {
                  _id: null,
                  total: { $sum: 1 },
                },
              },
              {
                $project: {
                  _id: 0,
                  total: {
                    $ceil: {
                      $divide: ['$total', limit],
                    },
                  },
                },
              },
            ],
            data: [
              {
                $skip: (page - 1) * limit,
              },
              {
                $limit: limit,
              },
              {
                $project: {
                  companyId: '$companyDetails._id',
                  companyName: '$companyDetails.name',
                  deadline: '$companyDetails.deadline',
                  submissions: 1,
                },
              },
            ],
          },
        },
        {
          $project: {
            data: '$data',
            totalPages: '$totalPages.total',
          },
        },
        {
          $unwind: '$totalPages',
        },
      ])

      if (data.length === 0) {
        return {
          totalPages: 0,
          data: [],
        }
      }

      return {
        totalPages: data[0].totalPages,
        data: data[0].data,
      }
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}

const submissionsCRUD = new SubmissionsCRUD()
export default submissionsCRUD
