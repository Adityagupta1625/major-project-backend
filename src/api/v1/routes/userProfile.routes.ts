import { userProfileController } from '../controllers'
import { Router } from 'express'
import { userProfileValidator } from '../validators'

const userProfileRouter = Router()

userProfileRouter.post(
  '/',
  userProfileValidator.validateInput.bind(userProfileValidator),
  userProfileController.addController.bind(userProfileController)
)

userProfileRouter.get(
  '/:id',
  userProfileController.getByIdController.bind(userProfileController)
)

userProfileRouter.put(
  '/:id',
  userProfileValidator.validateInput.bind(userProfileValidator),
  userProfileController.updateController.bind(userProfileController)
)

export default userProfileRouter
