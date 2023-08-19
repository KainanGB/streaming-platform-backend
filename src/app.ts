import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { usersRouter } from './routes/users-routes'
import { authenticateRoutes } from './routes/authenticate'
import { refreshRoutes } from './routes/refresh'
import { verifyJWT } from './middlewares/verify-jwt'

export const app = express()

app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(cookieParser())
app.use(express.json())
app.use(authenticateRoutes)
app.use(refreshRoutes)

app.use(usersRouter)
app.use(verifyJWT)
