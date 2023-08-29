import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import pinoHttp from 'pino-http'

import { usersRouter } from './routes/users'
import { authenticateRoutes } from './routes/authenticate'
import { refreshRoutes } from './routes/refresh'
import { verifyJWT } from './middlewares/verify-jwt'
import { ErrorHandler } from './middlewares/error-handler'
import { postRoutes } from './routes/posts'
import { logger } from './lib/logger'

export const app = express()

app.use(pinoHttp({ logger }))
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(cookieParser())
app.use(express.json())
app.use(authenticateRoutes)
app.use(refreshRoutes)

app.use(usersRouter)

app.use(verifyJWT)
app.use(postRoutes)
app.use(ErrorHandler)
