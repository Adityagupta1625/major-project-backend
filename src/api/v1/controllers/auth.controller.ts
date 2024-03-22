import { HttpException, errorHandler } from '../../../utils'
import { userCRUD } from '../crud'
import { Request, Response } from 'express'
import bcrypt, { compareSync } from 'bcryptjs'
import jwt from 'jsonwebtoken'

class AuthController {
  public async register(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password, role } = req.body
      const hashedPassword = bcrypt.hashSync(password, 10)

      const user = await userCRUD.add({ email, password: hashedPassword, role })

      const token = jwt.sign({ id: user._id }, process.env.SECRET ?? '')

      return res.status(200).json({
        message: 'Login Successfully!!',
        token,
        role: user.role,
      })
    } catch (e) {
      return errorHandler(res, e)
    }
  }
  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body

      const user = await userCRUD.get({ email: email })
      if (user === null) throw new HttpException(404, 'User Does not Exist')

      const isValid = compareSync(password, user.password)
      if (isValid === false) throw new HttpException(401, 'Invalid Credentials')

      const token = jwt.sign({ id: user._id }, process.env.SECRET ?? '')

      return res.status(200).json({
        message: 'Login Successfully!!',
        token,
        role: user.role,
      })
    } catch (e) {
      return errorHandler(e, res)
    }
  }

  public async resetPassword(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body
      const hashedPassword = bcrypt.hashSync(password, 10)

      const user = await userCRUD.get({ email: email })
      if (user === null) throw new HttpException(404, 'User Does not Exist')

      await userCRUD.update(user._id.toString(), { password: hashedPassword })

      const token = jwt.sign({ id: user._id }, process.env.SECRET ?? '')

      return res.status(200).json({
        message: 'Password Reset Successfully!!',
        token,
        role: user.role,
      })
    } catch (e) {
      return errorHandler(e, res)
    }
  }
}

const authController = new AuthController()
export default authController
