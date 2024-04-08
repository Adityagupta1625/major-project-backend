import { CRUDBase, HttpException } from '../../../utils'
import { UserProfileModel } from '../models'
import { type UserProfileDTO } from '../types'
import { type FilterQuery } from 'mongoose'

class UserProfileCRUD extends CRUDBase<UserProfileDTO> {
  constructor () {
    super(UserProfileModel)
  }

  public async update (
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
