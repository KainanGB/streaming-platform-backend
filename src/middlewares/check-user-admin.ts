import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

export async function checkIfAdmin(req: Request, res: Response, next: NextFunction) {
  const accessToken = req.headers.authorization

  if (!accessToken) {
    return res.status(401).send('Unauthorized')
  }

  try {
    const decoded = (await jwt.verify(accessToken, process.env.JWT_SECRET!)) as jwt.JwtPayload
    if (decoded.role !== 'ADMIN') throw Error()
    next()
  } catch (error) {
    return res.status(401).send('Unauthorized')
  }
}
