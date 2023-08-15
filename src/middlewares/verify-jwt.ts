import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

export async function verifyJWT(req: Request, res: Response, next: NextFunction) {
  const accessToken = req.headers.authorization

  if (!accessToken) {
    return res.status(401).send('Unauthorized')
  }

  try {
    await jwt.verify(accessToken, process.env.JWT_SECRET!)
    next()
  } catch (error) {
    return res.status(401).send('Unauthorized')
  }
}
