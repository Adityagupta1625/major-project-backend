import { CRUDBase } from "../../../utils";
import { AnnouncementModel } from "../models";
import { AnnouncementInterface } from "../types";

class AnnouncementCRUD extends CRUDBase<AnnouncementInterface> {
  constructor() {
    super(AnnouncementModel);
  }
}

const announcementCRUD = new AnnouncementCRUD();
export default announcementCRUD;