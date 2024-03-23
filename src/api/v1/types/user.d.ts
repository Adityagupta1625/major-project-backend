import { type Enum } from '../constants'
import { type Document } from 'mongoose'

export interface UserInterface extends Document {
  email: string
  password: string
  role: Enum.Roles
}
