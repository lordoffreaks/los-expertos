import config from './config'
import { createBot } from './bot'
import results from '../news.json'
import { createLogger } from './logger'
import { createResultsService } from './services/botResultsService'

const logger = createLogger(config)
const bot = createBot(config, logger, results)
const resultsService = createResultsService(config)

const startBot = async () => {
  try {
    await bot.run()
    logger.info('App is up and running!')
  } catch (err) {
    logger.error('Error starting the bot', err)
  }
}
resultsService
  .fetch()
  .then(async () => await startBot())
  .catch(err => {
    logger.error('Error fetching the results', err)
  })
