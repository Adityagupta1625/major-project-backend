import { TypeAssertion } from 'typescript'
import { CRUDBase, HttpException } from '../../../utils'
import { UserProfileModel } from '../models'
import { type UserProfileDTO } from '../types'
import { type FilterQuery,ObjectId } from 'mongoose'

class UserProfileCRUD extends CRUDBase<UserProfileDTO> {
  constructor() {
    super(UserProfileModel)
  }

  public async getUserDetails(userId: ObjectId) {
    try {
      const userDetails = await this.baseModel.aggregate([
        {
          $match:{
            userId: userId,
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'userDetails',
          },
        },
        {
          $unwind: '$userDetails',
        },
        {
          $project: {
            'userDetails.password': 0,
            email: '$userDetails.email',
            'userDetails.role': 0,
            'userDetails.createdAt': 0,
            'userDetails.updatedAt': 0,
          },
        },
      ])

      if (userDetails.length === 0)
        throw new HttpException(404, 'Resource Not Found!!')

      return userDetails[0]
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  public async update(
    query: FilterQuery<UserProfileDTO>,
    data: Partial<UserProfileDTO>
  ): Promise<UserProfileDTO> {
    try {
      const result = await this.baseModel.findOneAndUpdate(
        { userId: data.userId },
        data,
        { new: true, upsert: true }
      )

      if (result === null) throw new HttpException(404, 'Resource Not Found!!')

      return result
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}

const userProfileCRUD = new UserProfileCRUD()
export default userProfileCRUD
