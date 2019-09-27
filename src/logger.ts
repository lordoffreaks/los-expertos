import winston from 'winston'
import { Timber } from '@timberio/node'
import { TimberTransport } from '@timberio/winston'
import { AppConfig } from './config'

export type AppLogger = winston.Logger

export const createLogger = (config: AppConfig) => {
  // Create a Timber client
  const timberCredentials = config.get('timber')

  let extraTransports = []
  if (timberCredentials.api_key && timberCredentials.source_id) {
    extraTransports.push(
      new TimberTransport(
        new Timber(config.get('timber.api_key'), config.get('timber.source_id'))
      )
    )
  }

  // Create a Winston logger - passing in the Timber transport
  const logger = winston.createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.simple()
      }),
      ...extraTransports
    ]
  })

  if (extraTransports.length > 1) {
    logger.info('Timber transport added!')
  }

  return logger
}
