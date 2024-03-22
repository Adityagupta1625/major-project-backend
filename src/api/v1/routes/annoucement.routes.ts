import { announcementController } from '../controllers'
import { Router } from 'express'

const announcementRouter = Router()

announcementRouter.post(
  '/',
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
  announcementController.updateController.bind(announcementController)
)

announcementRouter.delete(
  '/:id',
  announcementController.deleteController.bind(announcementController)
)

export default announcementRouter
