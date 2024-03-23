import { BaseController } from '../../../utils'
import { announcementCRUD } from '../crud'
import { type AnnouncementInterface } from '../types'

class AnnouncementController extends BaseController<AnnouncementInterface> {
  constructor () {
    super(announcementCRUD)
  }
}

const announcementController = new AnnouncementController()
export default announcementController
