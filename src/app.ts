import express from 'express'
import { usersRouter } from './routes/users-routes'

export const app = express()
app.use(express.json())
app.use(usersRouter)
