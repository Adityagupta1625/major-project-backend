import { CRUDBase } from '../../../utils'
import { UserModel } from '../models'
import { type UserDTO } from '../types'

class UserCRUD extends CRUDBase<UserDTO> {
  constructor () {
    super(UserModel)
  }
}

const userCRUD = new UserCRUD()
export default userCRUD
