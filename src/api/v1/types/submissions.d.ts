import { type Document, type ObjectId } from 'mongoose'
import { type Enum } from '../constants'
import { UserProfileDTO } from './userProfile'
import { UpcomingCompaniesDTO } from './upcomingCompanies'

export interface SubmissionsDTO extends Document {
  companyId: ObjectId
  userId: ObjectId
  status: Enum.FormStatus
  comments: string[]
}

type SubmissionDetailsWithUser={
  userProfile: UserProfileDTO
  status: Enum.FormStatus
  comments: string[]
}

type SubmissionDetailsWithCompany={
  companyDetails: UpcomingCompaniesDTO
  status: Enum.FormStatus
  comments: string[]
}