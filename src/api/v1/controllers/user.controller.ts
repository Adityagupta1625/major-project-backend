import { BaseController, HttpException, errorHandler } from '../../../utils'
import { userCRUD } from '../crud'
import { type UserDTO } from '../types'
import { type Request, type Response } from 'express'

class UserController extends BaseController<UserDTO> {
  constructor () {
    super(userCRUD)
  }

  public async getController (req: Request, res: Response): Promise<Response> {
    try {
      const id = req.query?.userId

      if (typeof id !== 'string') {
        throw new HttpException(400, 'userId required')
      }

      const user = await this.CRUDService.getById(id)
      return res.status(200).json(user)
    } catch (e) {
      return await errorHandler(e, res)
    }
  }
}

const userController = new UserController()
export default userController
