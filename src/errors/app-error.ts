import { HttpStatusCode } from './http-status-code'

export class AppError extends Error {
  public readonly name: string
  public readonly httpCode: HttpStatusCode
  public readonly isOperational: boolean

  constructor(name: string, httpCode: HttpStatusCode, description: string, isOperational: boolean) {
    super(description)

    Object.setPrototypeOf(this, AppError.prototype)
    this.name = name
    this.httpCode = httpCode
    this.isOperational = isOperational
  }
}
