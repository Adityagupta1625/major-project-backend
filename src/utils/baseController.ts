import { type Request, type Response } from 'express'
import { type CRUDBaseInterface } from './baseCrud'
import { type Document } from 'mongoose'
import { errorHandler } from './errorHandler'
import HttpException from './HttpException'
import { Schema } from 'mongoose'

export abstract class BaseController<T extends Document> {
  protected readonly CRUDService: CRUDBaseInterface<T>

  constructor (CRUDService: CRUDBaseInterface<T>) {
    this.CRUDService = CRUDService
  }

  public async addController (req: Request, res: Response): Promise<Response> {
    try {
      const resp = await this.CRUDService.add(req.body)
      return res
        .status(201)
        .json({ message: 'Data added Successfully!!', id: resp._id })
    } catch (e) {
      return await errorHandler(e, res)
    }
  }

  public async getAllController (
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const data = await this.CRUDService.findAll(req.query as any)
      return res.status(200).json(data)
    } catch (e) {
      return await errorHandler(e, res)
    }
  }

  public async getController (req: Request, res: Response): Promise<Response> {
    try {
      const data = await this.CRUDService.find(req.query as any)
      return res.status(200).json(data)
    } catch (e) {
      return await errorHandler(e, res)
    }
  }

  public async getPaginatedController(req: Request,res: Response): Promise<Response>{
    try{
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

      const data=await this.CRUDService.getPaginated(query,page,limit)

      return res.status(200).json(data)
    }
    catch(e){
      return await errorHandler(e,res)
    }
  }

  public async getByIdController (
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      if (typeof req.params.id !== 'string') {
        throw new HttpException(400, 'Invalid ID')
      }

      const data = await this.CRUDService.getById(req.params.id)
      return res.status(200).json(data)
    } catch (e) {
      return await errorHandler(e, res)
    }
  }

  public async updateController (
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      if (typeof req.params.id !== 'string') {
        throw new HttpException(400, 'Invalid ID')
      }

      const data = await this.CRUDService.update(
        { _id: req.params.id },
        req.body
      )
      return res.status(200).json(data)
    } catch (e) {
      return await errorHandler(e, res)
    }
  }

  public async deleteController (
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      if (typeof req.params.id !== 'string') {
        throw new HttpException(400, 'Invalid ID')
      }

      await this.CRUDService.delete({
        _id: new Schema.Types.ObjectId(req.params.id)
      })
      return res.status(204).json({ message: 'Deleted Successfully!!' })
    } catch (e) {
      return await errorHandler(e, res)
    }
  }
}
