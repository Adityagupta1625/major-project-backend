import { placementFormController } from "../controllers";
import { Router } from "express";
import { authorizeHeads } from "../middleware";

const placementFormRouter=Router()

placementFormRouter.post('/',authorizeHeads,placementFormController.addController.bind(placementFormController))

placementFormRouter.get('/',authorizeHeads, placementFormController.getController.bind(placementFormController))

placementFormRouter.get('/:id',authorizeHeads,placementFormController.getByIdController.bind(placementFormController))

placementFormRouter.put('/:id',authorizeHeads, placementFormController.updateController.bind(placementFormController))

placementFormRouter.delete('/:id',authorizeHeads,placementFormController.deleteController.bind(placementFormController))

export default placementFormRouter