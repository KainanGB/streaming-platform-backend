import 'jsonwebtoken'

declare module 'jsonwebtoken' {
  export interface JwtPayload {
    role: string
  }
}
