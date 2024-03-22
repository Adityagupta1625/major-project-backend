import { upcomingCompaniesController } from '../controllers'
import { Router } from 'express'

const upcomingCompaniesRouter = Router()

upcomingCompaniesRouter.post(
  '/',
  upcomingCompaniesController.addController.bind(upcomingCompaniesController)
)

upcomingCompaniesRouter.get(
  '/',
  upcomingCompaniesController.getController.bind(upcomingCompaniesController)
)

upcomingCompaniesRouter.get(
  '/:id',
  upcomingCompaniesController.getByIdController.bind(
    upcomingCompaniesController
  )
)

upcomingCompaniesRouter.put(
  '/:id',
  upcomingCompaniesController.updateController.bind(upcomingCompaniesController)
)

upcomingCompaniesRouter.delete(
  '/:id',
  upcomingCompaniesController.deleteController.bind(upcomingCompaniesController)
)

export default upcomingCompaniesRouter
