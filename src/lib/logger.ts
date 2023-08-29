import pino from 'pino'
import type { LoggerOptions } from 'pino'

const pinoLoggerConfig: LoggerOptions = {
  level: process.env.NODE_ENV === 'dev' ? 'debug' : 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  }
}

export const logger = pino(pinoLoggerConfig)
