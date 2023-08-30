import { ZodIssue } from 'zod'
import { HttpStatusCode } from './http-status-code'

export class ValidationError extends Error {
  public readonly httpCode = HttpStatusCode.BAD_REQUEST
  public readonly property: string | number

  constructor(message: string, validationMessage: ZodIssue[]) {
    super(message)

    Object.setPrototypeOf(this, ValidationError.prototype)
    this.message = validationMessage[0].message
    this.property = validationMessage[0].path[0]
  }

  serializeErrors() {
    return { message: this.message, property: this.property }
  }
}
