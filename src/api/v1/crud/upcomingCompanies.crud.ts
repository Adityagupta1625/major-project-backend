import { CRUDBase, HttpException } from '../../../utils'
import { UpcomingCompaniesModel } from '../models'
import { type UpcomingCompaniesDTO } from '../types'
import { Types } from 'mongoose'

class UpcomingCompaniesCRUD extends CRUDBase<UpcomingCompaniesDTO> {
  constructor() {
    super(UpcomingCompaniesModel)
  }

  public async getCompaniesToApply(
    userId: string
  ): Promise<UpcomingCompaniesDTO[]> {
    try {
      const data = await this.baseModel.aggregate([
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
      ])

      return data
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}

const upcomingCompaniesCRUD = new UpcomingCompaniesCRUD()
export default upcomingCompaniesCRUD
