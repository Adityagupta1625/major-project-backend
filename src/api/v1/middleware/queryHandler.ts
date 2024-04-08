import { type NextFunction, type Request, type Response } from 'express'

export const queryHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { query } = req
  delete query.userId
  delete query.userRole
  next()
}
