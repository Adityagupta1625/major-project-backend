import { upcomingCompaniesController } from '../controllers'
import { Router } from 'express'
import { authorizeAdmin } from '../middleware'

const upcomingCompaniesRouter = Router()

upcomingCompaniesRouter.post(
  '/',
  authorizeAdmin,
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
  authorizeAdmin,
  upcomingCompaniesController.updateController.bind(upcomingCompaniesController)
)

upcomingCompaniesRouter.delete(
  '/:id',
  authorizeAdmin,
  upcomingCompaniesController.deleteController.bind(upcomingCompaniesController)
)

export default upcomingCompaniesRouter
