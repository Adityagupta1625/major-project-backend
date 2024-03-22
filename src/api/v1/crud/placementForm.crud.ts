import { CRUDBase } from "../../../utils";
import { PlacementFormModel } from "../models";
import { PlacementFormInterface } from "../types";

class PlacementFormCRUD extends CRUDBase<PlacementFormInterface> {
  constructor() {
    super(PlacementFormModel);
  }
}

const placementFormCRUD = new PlacementFormCRUD();
export default placementFormCRUD;