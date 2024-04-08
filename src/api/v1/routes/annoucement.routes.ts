import { announcementController } from '../controllers'
import { Router } from 'express'
import { authorizeAdmin, queryHandler } from '../middleware'
import { announcementValidator } from '../validators'

const announcementRouter = Router()

announcementRouter.post(
  '/',
  authorizeAdmin,
  queryHandler,
  announcementValidator.validateInput.bind(announcementValidator),
  announcementController.addController.bind(announcementController)
)

announcementRouter.get(
  '/',
  queryHandler,
  announcementController.getAllController.bind(announcementController)
)

announcementRouter.get(
  '/:id',
  announcementController.getByIdController.bind(announcementController)
)

announcementRouter.put(
  '/:id',
  authorizeAdmin,
  announcementValidator.validateInput.bind(announcementValidator),
  announcementController.updateController.bind(announcementController)
)

announcementRouter.delete(
  '/:id',
  authorizeAdmin,
  announcementController.deleteController.bind(announcementController)
)

export default announcementRouter
