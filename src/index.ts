import throng from 'throng'
import config from './config'
import { createBot } from './bot'

const logger = console
const bot = createBot(config, logger)

throng((id: any) => {
  logger.info(`Started worker ${id}`)
  bot
    .run()
    .then(() => logger.info('App is up and running!'))
    .catch(err => {
      logger.error('Error starting the bot', err)
    })
})
