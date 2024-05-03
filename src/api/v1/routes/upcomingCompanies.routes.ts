import { upcomingCompaniesController } from '../controllers'
import { Router } from 'express'
import { authorizeAdmin, queryHandler } from '../middleware'
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
  queryHandler,
  upcomingCompaniesController.getAllController.bind(upcomingCompaniesController)
)

upcomingCompaniesRouter.get(
  '/apply',
  upcomingCompaniesController.getCompaniesToApply.bind(
    upcomingCompaniesController
  )
)

upcomingCompaniesRouter.get(
  '/:id',
  queryHandler,
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
