import { CRUDBase } from '../../../utils'
import { AnnouncementModel } from '../models'
import { type AnnouncementDTO } from '../types'

class AnnouncementCRUD extends CRUDBase<AnnouncementDTO> {
  constructor () {
    super(AnnouncementModel)
  }
}

const announcementCRUD = new AnnouncementCRUD()
export default announcementCRUD
