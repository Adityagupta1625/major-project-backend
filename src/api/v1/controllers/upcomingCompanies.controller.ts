import { BaseController, HttpException, errorHandler } from '../../../utils'
import { upcomingCompaniesCRUD } from '../crud'
import { type UpcomingCompaniesDTO } from '../types'
import { Request,Response } from 'express'

class UpcomingCompaniesController extends BaseController<UpcomingCompaniesDTO> {
  constructor () {
    super(upcomingCompaniesCRUD)
  }

  public async getCompaniesToApply(req: Request,res: Response): Promise<Response>{
    try{
      let userId: string= req.query.userId as string

      const query: any=req.query
      if(typeof req.query?.page!=='string' || typeof req.query?.limit!=='string'){
        throw new HttpException(400,'Page or limit not defined!!')
      }

      let page: string | number=req.query.page
      let limit: string | number=req.query.limit

      page=parseInt(page)
      limit=parseInt(limit)

      if(isNaN(page) || isNaN(limit))
        throw new HttpException(400,'Invalid Page or limit value')

      delete query.page
      delete query.limit

      const data=await upcomingCompaniesCRUD.getCompaniesToApply(userId,page,limit)
      return res.status(200).json(data)
    }
    catch(e){
      return await errorHandler(e, res)
    }
  }

}

const upcomingCompaniesController = new UpcomingCompaniesController()
export default upcomingCompaniesController
