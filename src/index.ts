import config from './config'
import { createBot } from './bot'

const logger = console
const bot = createBot(config, logger)

bot.run().catch(err => {
  logger.error('Error starting the bot', err)
})
