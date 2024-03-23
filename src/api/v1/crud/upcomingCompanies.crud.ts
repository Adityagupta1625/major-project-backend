import { CRUDBase } from '../../../utils'
import { UpcomingCompaniesModel } from '../models'
import { type UpcomingCompaniesInterface } from '../types'

class UpcomingCompaniesCRUD extends CRUDBase<UpcomingCompaniesInterface> {
  constructor () {
    super(UpcomingCompaniesModel)
  }
}

const upcomingCompaniesCRUD = new UpcomingCompaniesCRUD()
export default upcomingCompaniesCRUD
