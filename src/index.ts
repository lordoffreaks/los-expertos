import config from './config'
import { createBot } from './bot'
import results from '../news.json'

const logger = console
const bot = createBot(config, logger, results)

bot
  .run()
  .then(() => logger.info('App is up and running!'))
  .catch(err => {
    logger.error('Error starting the bot', err)
  })
