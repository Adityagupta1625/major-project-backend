import { BaseController, errorHandler } from '../../../utils'
import { userProfileCRUD } from '../crud'
import { type UserProfileDTO } from '../types'
import { type Request, type Response } from 'express'
import { Types } from 'mongoose'

class UserProfileController extends BaseController<UserProfileDTO> {
  constructor () {
    super(userProfileCRUD)
  }

  public async getByUserIdController (
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const userId = new Types.ObjectId(req.query.userId as string)
      const userProfile = await userProfileCRUD.find({ userId })
      return res.status(200).json(userProfile)
    } catch (e) {
      return await errorHandler(e, res)
    }
  }
}

const userProfileController = new UserProfileController()
export default userProfileController
