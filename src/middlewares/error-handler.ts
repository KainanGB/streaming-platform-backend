/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppError } from '@/errors/app-error'
import { NextFunction, Request, Response } from 'express'

export const ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    const error = err as AppError
    return res.status(error.httpCode).send({
      name: err.name,
      httpCode: err.httpCode,
      description: err.message,
      isOperational: err.isOperational
    })
  }

  return res.status(500).send({
    error: 'Internal Server Error'
  })
}
