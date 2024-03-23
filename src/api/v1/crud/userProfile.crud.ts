import { CRUDBase } from '../../../utils'
import { UserProfileModel } from '../models'
import { type UserProfileInterface } from '../types'

class UserProfileCRUD extends CRUDBase<UserProfileInterface> {
  constructor () {
    super(UserProfileModel)
  }
}

const userProfileCRUD = new UserProfileCRUD()
export default userProfileCRUD
