import { placementFormController } from "../controllers";
import { Router } from "express";

const placementFormRouter=Router()

placementFormRouter.post('/',placementFormController.addController.bind(placementFormController))

placementFormRouter.get('/', placementFormController.getController.bind(placementFormController))

placementFormRouter.get('/:id', placementFormController.getByIdController.bind(placementFormController))

placementFormRouter.put('/:id', placementFormController.updateController.bind(placementFormController))

placementFormRouter.delete('/:id', placementFormController.deleteController.bind(placementFormController))

export default placementFormRouter