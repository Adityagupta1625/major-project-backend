import { BaseController } from '../../../utils'
import { upcomingCompaniesCRUD } from '../crud'
import { type UpcomingCompaniesInterface } from '../types'

class UpcomingCompaniesController extends BaseController<UpcomingCompaniesInterface> {
  constructor () {
    super(upcomingCompaniesCRUD)
  }
}

const upcomingCompaniesController = new UpcomingCompaniesController()
export default upcomingCompaniesController
