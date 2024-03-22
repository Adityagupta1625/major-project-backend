import {Document} from 'mongoose'

export interface AnnouncementInterface extends Document{
    title: string,
    description: string,
    doc: string | null
}