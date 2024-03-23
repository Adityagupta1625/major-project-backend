import { formResponseController } from '../controllers'
import { Router } from 'express'
import { authorizeHeads } from '../middleware'

const formResponsesRouter = Router()

formResponsesRouter.get(
  '/',
  authorizeHeads,
  formResponseController.getAllController.bind(formResponseController)
)

formResponsesRouter.get(
  '/:id',
  authorizeHeads,
  formResponseController.getByResponseIdController.bind(formResponseController)
)

export default formResponsesRouter
