import { type NextFunction, type Request, type Response } from 'express'
import { Roles } from '../constants/enum'

export const authorizeAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.query.userRole === Roles.TPO) {
    next()
  } else {
    res.status(401).json({ message: 'Not Allowed' })
  }
}

export const authorizeHeads = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.query.userRole === Roles.TPO || req.query.userRole === Roles.PR) {
    next()
  } else {
    res.status(401).json({ message: 'Not Allowed' })
  }
}
