import { HttpStatusCode } from './http-status-code'

export class ResourceNotFound extends Error {
  public readonly message: string
  public readonly httpCode = HttpStatusCode.BAD_REQUEST
  public readonly path: string

  constructor(path: string) {
    super()
    Object.setPrototypeOf(this, ResourceNotFound.prototype)
    this.message = 'resource not found'
    this.path = path
  }

  serializeErrors() {
    return [{ message: this.message, path: this.path }]
  }
}
