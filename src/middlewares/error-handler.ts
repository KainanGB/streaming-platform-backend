/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppError } from '@/errors/app-error'
import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'
import { ResourceAlreadyExists } from '@/errors/resource-already-exists'
import { ResourceNotFound } from '@/errors/resource-not-found'
import { ValidationError } from '@/errors/validation-error'
import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

export const ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  req.log.error({
    ...err
  })

  if (err instanceof AppError) {
    return res.status(err.httpCode).send({
      name: err.name,
      httpCode: err.httpCode,
      description: err.message,
      isOperational: err.isOperational
    })
  }

  if (err instanceof ZodError) {
    const validationError = new ValidationError('validation error', err.issues)
    return res.status(validationError.httpCode).send({ ...validationError.serializeErrors() })
  }

  if (
    err instanceof ResourceAlreadyExists ||
    err instanceof ResourceNotFound ||
    err instanceof InvalidCredentialsError
  ) {
    return res.status(err.httpCode).send({ ...err })
  }

  return res.status(500).send({
    error: 'Internal Server Error'
  })
}
