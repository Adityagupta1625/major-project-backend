import { placementFormController } from '../controllers'
import { Router } from 'express'
import { authorizeHeads, queryHandler } from '../middleware'
import { placementFormValidator } from '../validators'

const placementFormRouter = Router()

placementFormRouter.post(
  '/',
  authorizeHeads,
  placementFormValidator.validateInput.bind(placementFormValidator),
  placementFormController.addController.bind(placementFormController)
)

placementFormRouter.get(
  '/',
  queryHandler,
  placementFormController.getAllController.bind(placementFormController)
)

placementFormRouter.get(
  '/:id',
  queryHandler,
  placementFormController.getByIdController.bind(placementFormController)
)

placementFormRouter.put(
  '/:id',
  authorizeHeads,
  placementFormValidator.validateInput.bind(placementFormValidator),
  placementFormController.updateController.bind(placementFormController)
)

placementFormRouter.delete(
  '/:id',
  authorizeHeads,
  placementFormController.deleteController.bind(placementFormController)
)

export default placementFormRouter
