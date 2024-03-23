import { upcomingCompaniesController } from '../controllers'
import { Router } from 'express'
import { authorizeAdmin } from '../middleware'
import { upcomingCompaniesValidator } from '../validators'

const upcomingCompaniesRouter = Router()

upcomingCompaniesRouter.post(
  '/',
  authorizeAdmin,
  upcomingCompaniesValidator.validateInput.bind(upcomingCompaniesValidator),
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
  upcomingCompaniesValidator.validateInput.bind(upcomingCompaniesValidator),
  upcomingCompaniesController.updateController.bind(upcomingCompaniesController)
)

upcomingCompaniesRouter.delete(
  '/:id',
  authorizeAdmin,
  upcomingCompaniesController.deleteController.bind(upcomingCompaniesController)
)

export default upcomingCompaniesRouter
