import { announcementController } from '../controllers'
import { Router } from 'express'
import { authorizeAdmin } from '../middleware'

const announcementRouter = Router()

announcementRouter.post(
  '/',
  authorizeAdmin,
  announcementController.addController.bind(announcementController)
)

announcementRouter.get(
  '/',
  announcementController.getController.bind(announcementController)
)

announcementRouter.get(
  '/:id',
  announcementController.getByIdController.bind(announcementController)
)

announcementRouter.put(
  '/:id',
  authorizeAdmin,
  announcementController.updateController.bind(announcementController)
)

announcementRouter.delete(
  '/:id',
  authorizeAdmin,
  announcementController.deleteController.bind(announcementController)
)

export default announcementRouter
