import winston from 'winston'
import { Timber } from '@timberio/node'
import { TimberTransport } from '@timberio/winston'
import { BotConfig } from './config'

export const createLogger = (config: BotConfig) => {
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

  return logger
}
