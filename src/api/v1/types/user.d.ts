import { type Enum } from '../constants'
import { type Document } from 'mongoose'

export interface UserDTO extends Document {
  email: string
  password: string
  role: Enum.Roles
}
