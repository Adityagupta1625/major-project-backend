import { Enum } from '../constants'
import {Document} from 'mongoose'

export interface UserInterface extends Document {
  email: string
  password: string
  role: Enum.Roles
}
