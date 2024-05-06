import { type Document, type ObjectId } from 'mongoose'
import { type Enum } from '../constants'
import { UserProfileDTO } from './userProfile'
import { UpcomingCompaniesDTO } from './upcomingCompanies'

export interface SubmissionsDTO extends Document {
  companyId: ObjectId | String
  userId: ObjectId | String
  status: Enum.FormStatus
  comments: string[]
}

export type SubmissionDetailsWithUser={
  userProfile: UserProfileDTO
  status: Enum.FormStatus
  comments: string[]
  _id: string
}

export type SubmissionDetailsWithCompany={
  companyDetails: UpcomingCompaniesDTO
  status: Enum.FormStatus
  comments: string[]
}

export type SubmissionDetailsByCompany={
  companyName: string
  submissions: number
  deadline: string
  companyId: string
}