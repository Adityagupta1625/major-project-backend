import { BaseController } from "../../../utils";
import { userProfileCRUD } from "../crud";
import { UserProfileInterface } from "../types";


class UserProfileController extends BaseController<UserProfileInterface>{
    constructor() {
        super(userProfileCRUD)
    }
}

const userProfileController=new UserProfileController()
export default userProfileController