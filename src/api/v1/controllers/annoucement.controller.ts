import { BaseController } from '../../../utils'
import { announcementCRUD } from '../crud'
import { type AnnouncementDTO } from '../types'

class AnnouncementController extends BaseController<AnnouncementDTO> {
  constructor () {
    super(announcementCRUD)
  }
}

const announcementController = new AnnouncementController()
export default announcementController
