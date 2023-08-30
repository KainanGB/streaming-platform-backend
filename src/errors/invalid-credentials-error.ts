import { HttpStatusCode } from './http-status-code'

export class InvalidCredentialsError extends Error {
  public readonly message: string
  public readonly httpCode = HttpStatusCode.CONFLICT
  public readonly path: string

  constructor(path: string) {
    super()
    Object.setPrototypeOf(this, InvalidCredentialsError.prototype)
    this.message = 'invalid credentials'
    this.path = path
  }

  serializeErrors() {
    return [{ message: this.message, path: this.path }]
  }
}
