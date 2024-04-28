import { userProfileController } from '../controllers'
import { Router } from 'express'
import { userProfileValidator } from '../validators'
import { authorizeAdmin, queryHandler } from '../middleware'

const userProfileRouter = Router()

userProfileRouter.get(
  '/all',
  authorizeAdmin,
  queryHandler,
  userProfileController.getAllController.bind(userProfileController)
)

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
