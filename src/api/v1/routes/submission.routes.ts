import { submissionController } from '../controllers'
import { Router } from 'express'
import { submissionValidator, commentValidator,updateSubmissionValidator } from '../validators'

const submissionRouter = Router()

submissionRouter.post(
  '/',
  submissionValidator.validateInput.bind(submissionValidator),
  submissionController.addController.bind(submissionController)
)

submissionRouter.put(
  '/:id',
  updateSubmissionValidator.validateInput.bind(updateSubmissionValidator),
  submissionController.updateController.bind(submissionController)
)


submissionRouter.get(
  '/',
  submissionController.getAllSubmissionsByCompany.bind(submissionController)
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
