import { BaseController } from '../../../utils'
import { upcomingCompaniesCRUD } from '../crud'
import { type UpcomingCompaniesDTO } from '../types'

class UpcomingCompaniesController extends BaseController<UpcomingCompaniesDTO> {
  constructor () {
    super(upcomingCompaniesCRUD)
  }
}

const upcomingCompaniesController = new UpcomingCompaniesController()
export default upcomingCompaniesController
