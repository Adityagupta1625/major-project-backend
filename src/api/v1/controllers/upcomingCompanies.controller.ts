import { BaseController, errorHandler } from '../../../utils'
import { upcomingCompaniesCRUD } from '../crud'
import { type UpcomingCompaniesDTO } from '../types'
import { Request,Response } from 'express'
import mongoose,{ObjectId} from 'mongoose'

class UpcomingCompaniesController extends BaseController<UpcomingCompaniesDTO> {
  constructor () {
    super(upcomingCompaniesCRUD)
  }

  public async getCompaniesToApply(req: Request,res: Response): Promise<Response>{
    try{
      let userId: string= req.query.userId as string
      const data=await upcomingCompaniesCRUD.getCompaniesToApply(userId)
      return res.status(200).json(data)
    }
    catch(e){
      return await errorHandler(e, res)
    }
  }

}

const upcomingCompaniesController = new UpcomingCompaniesController()
export default upcomingCompaniesController
