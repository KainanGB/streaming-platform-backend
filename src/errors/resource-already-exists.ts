import { HttpStatusCode } from './http-status-code'

export class ResourceAlreadyExists extends Error {
  public readonly message: string
  public readonly httpCode = HttpStatusCode.CONFLICT
  public readonly path: string

  constructor(path: string) {
    super()
    Object.setPrototypeOf(this, ResourceAlreadyExists.prototype)
    this.message = 'resource already exists'
    this.path = path
  }

  serializeErrors() {
    return [{ message: this.message, path: this.path }]
  }
}
