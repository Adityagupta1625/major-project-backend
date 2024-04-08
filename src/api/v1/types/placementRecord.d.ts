import { type Document } from 'mongoose'

interface PlacementRecordDTO extends Document {
  studentEmail: string
  companyName: string
  jobTitle: string
  ctc: string | null
  intern: boolean
  internStipend: string | null
}
