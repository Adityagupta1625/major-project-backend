import { Router } from 'express'
import announcementRouter from './annoucement.routes'
import authRouter from './auth.routes'
import upcomingCompaniesRouter from './upcomingCompanies.routes'
import userRouter from './user.routes'
import userProfileRouter from './userProfile.routes'
import { validateToken } from '../middleware'
import placementFormRouter from './placementForm.routes'

const apiRouter = Router()

apiRouter.use('/auth',authRouter)
apiRouter.use('/announcements',validateToken, announcementRouter)
apiRouter.use('/upcoming-companies', validateToken,upcomingCompaniesRouter)
apiRouter.use('/users', validateToken,userRouter)
apiRouter.use('/user-profile', validateToken,userProfileRouter)
apiRouter.use('/placementForm',placementFormRouter)

export default apiRouter
