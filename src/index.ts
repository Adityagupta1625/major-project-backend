import express, { NextFunction, type Request, type Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import apiRouter from './api/v1/routes'
import { ConnectToMongo } from './config'

const app = express()
app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

dotenv.config({debug: true})

const PORT = process.env.port ?? 8000

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!!')
})

app.use('/api/v1',apiRouter)

app.get('*', (req: Request, res: Response) => {
  return res.status(403).send('Sorry, the page you requested was not found.')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})

ConnectToMongo()

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

process.on('uncaughtException', (err) => {
  console.log(err)
  process.exit(1)
})
