import { submissionController } from '../controllers'
import { Router } from 'express'
import { submissionValidator, commentValidator } from '../validators'

const submissionRouter = Router()

submissionRouter.post(
  '/',
  submissionValidator.validateInput.bind(submissionValidator),
  submissionController.addController.bind(submissionController)
)

submissionRouter.put(
  '/:id',
  submissionValidator.validateInput.bind(submissionValidator),
  submissionController.updateController.bind(submissionController)
)

submissionRouter.get(
  '/user',
  submissionController.getByUserId.bind(submissionController)
)

submissionRouter.get(
  '/company',
  submissionController.getByCompanyId.bind(submissionController)
)

submissionRouter.post(
  '/comment',
  commentValidator.validateInput.bind(commentValidator),
  submissionController.addCommentController.bind(submissionController)
)

export default submissionRouter
