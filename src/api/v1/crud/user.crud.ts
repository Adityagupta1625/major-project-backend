import { CRUDBase } from "../../../utils";
import { UserModel } from "../models";
import { UserInterface } from "../types";

class UserCRUD extends CRUDBase<UserInterface> {
  constructor() {
    super(UserModel);
  }
}

const userCRUD = new UserCRUD();
export default userCRUD;