import { type Response } from 'express'

export const errorHandler = async (
  e: any,
  res: Response
): Promise<Response> => {
  console.log('Error handler called--->', e)
  if (typeof e?.errorCode !== 'number') {
    return res.status(500).json(e.message ?? 'Internal Server Error')
  }

  return res.status(e?.errorCode).json(e?.message ?? 'Internal Server Error')
}
