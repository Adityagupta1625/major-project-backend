import { CRUDBase } from '../../../utils'
import { UpcomingCompaniesModel } from '../models'
import { type UpcomingCompaniesDTO } from '../types'

class UpcomingCompaniesCRUD extends CRUDBase<UpcomingCompaniesDTO> {
  constructor () {
    super(UpcomingCompaniesModel)
  }
}

const upcomingCompaniesCRUD = new UpcomingCompaniesCRUD()
export default upcomingCompaniesCRUD
