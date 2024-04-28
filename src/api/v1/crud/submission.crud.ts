import { CRUDBase } from "../../../utils";
import { SubmissionsModel } from "../models";
import { type SubmissionsDTO } from "../types";

class SubmissionsCRUD extends CRUDBase<SubmissionsDTO>{
    
    constructor(){
        super(SubmissionsModel)
    }
}

const submissionsCRUD=new SubmissionsCRUD()
export default submissionsCRUD