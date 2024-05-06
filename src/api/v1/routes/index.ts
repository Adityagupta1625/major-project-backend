import { Router } from 'express'
import announcementRouter from './annoucement.routes'
import authRouter from './auth.routes'
import upcomingCompaniesRouter from './upcomingCompanies.routes'
import userRouter from './user.routes'
import userProfileRouter from './userProfile.routes'
import submissionRouter from './submission.routes'
import { validateToken } from '../middleware'

const apiRouter = Router()

apiRouter.use('/auth', authRouter)
apiRouter.use('/announcements', validateToken, announcementRouter)
apiRouter.use('/upcoming-companies', validateToken, upcomingCompaniesRouter)
apiRouter.use('/user', validateToken, userRouter)
apiRouter.use('/user-profile', validateToken, userProfileRouter)
apiRouter.use('/submission',validateToken, submissionRouter)

export default apiRouter
