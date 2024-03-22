import { Document,ObjectId } from 'mongoose';
import { Enum } from '../constants'; 

export interface UserProfileInterface extends Document {
  userId: ObjectId;
  name: string;
  department: Enum.Departments;
  batch: string;
  course: Enum.Courses;
}

