import mongoose from 'mongoose'

export const ConnectToMongo = (): void => {
  mongoose.set('strictQuery', false)
  mongoose
    .connect(process.env.MONGO_URI ?? '', {
      dbName: 'tpo'
    })
    .then(() => {
      console.log('connected Succesfully!!')
    })
    .catch((err) => {
      console.log('Error in connecting', err)
    })
}
