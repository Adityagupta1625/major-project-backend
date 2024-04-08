import { userProfileController } from '../controllers'
import { Router } from 'express'
import { userProfileValidator } from '../validators'

const userProfileRouter = Router()

userProfileRouter.get(
  '/',
  userProfileController.getByUserIdController.bind(userProfileController)
)

userProfileRouter.put(
  '/',
  userProfileValidator.validateInput.bind(userProfileValidator),
  userProfileController.updateController.bind(userProfileController)
)

export default userProfileRouter
