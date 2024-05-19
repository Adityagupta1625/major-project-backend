import { CRUDBase, HttpException } from '../../../utils'
import { UpcomingCompaniesModel } from '../models'
import { type UpcomingCompaniesDTO } from '../types'
import { Types } from 'mongoose'

class UpcomingCompaniesCRUD extends CRUDBase<UpcomingCompaniesDTO> {
  constructor() {
    super(UpcomingCompaniesModel)
  }

  public async getCompaniesToApply(
    userId: string,
    page: number,
    limit: number
  ): Promise<{data:UpcomingCompaniesDTO[], totalPages: number}> {
    try {
      const resp = await this.baseModel.aggregate([
        {
          $lookup: {
            from: 'submissions',
            localField: '_id',
            foreignField: 'companyId',
            as: 'submissionDetails',
            pipeline: [
              {
                $group: {
                  _id: '$companyId',
                  user: {
                    $sum: {
                      $cond: [
                        {
                          $eq: ['$userId', new Types.ObjectId(userId)],
                        },
                        1,
                        0,
                      ],
                    },
                  },
                },
              },
              {
                $project: {
                  user: 1,
                },
              },
            ],
          },
        },
        {
          $match: {
            $or:[
              {
                'submissionDetails':{
                  $size: 0
                }
              },
              {
                'submissionDetails[0].user': {
                  $eq: 0,
                },
              },
              
            ]
          },
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
                  createdAt: -1,
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
}

const upcomingCompaniesCRUD = new UpcomingCompaniesCRUD()
export default upcomingCompaniesCRUD
