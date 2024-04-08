import { CRUDBase } from '../../../utils'
import { PlacementFormModel } from '../models'
import { type PlacementFormDTO } from '../types'

class PlacementFormCRUD extends CRUDBase<PlacementFormDTO> {
  constructor () {
    super(PlacementFormModel)
  }
}

const placementFormCRUD = new PlacementFormCRUD()
export default placementFormCRUD
