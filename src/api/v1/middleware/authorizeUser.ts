import { type NextFunction, type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { errorHandler } from '../../../utils'
import { Roles } from '../constants/enum'

export const authorizeAdmin = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void =>{

    if(req.query.userRole===Roles.TPO){
      next()
    }
    else{
      res.status(401).json({message: 'Not Allowed'})
      return
    }
    
}

export const authorizeHeads=(req: Request,res: Response,next: NextFunction): void=>{
  if(req.query.userRole===Roles.TPO || req.query.userRole===Roles.PR){
    next()
  }
  else{
    res.status(401).json({message: 'Not Allowed'})
    return
  }
}