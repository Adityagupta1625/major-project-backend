import { BaseController } from "../../../utils";
import { userCRUD } from "../crud";
import { UserInterface } from "../types";


class UserController extends BaseController<UserInterface>{
    constructor() {
        super(userCRUD)
    }
}

const userController=new UserController()
export default userController