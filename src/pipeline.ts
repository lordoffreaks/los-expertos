import config from './config'
import { createDependencies } from './dependencies'

const logger = console
setupProcessHooks()
const main = async () => {
  const { searchService } = await createDependencies(config, logger)
  const results = await searchService.search('Los Expertos')
  logger.info(results)
}

function setupProcessHooks() {
  process.on('uncaughtException', err => {
    logger.error('Uncaught exception', err)
    exitProcessWithError('Uncaught exception')
  })

  process.on('unhandledRejection', err => {
    logger.error('Unhandled rejection', err)
    exitProcessWithError('Unhandled rejection')
  })

  process.on('SIGINT', () => {
    exitProcessWithError('SIGINT received, shutting down app')
  })
}

function exitProcessWithError(errorMsg: string) {
  logger.error('Shutting down app: ', errorMsg)
  process.exit(1)
}

main().catch(err => {
  logger.error(`Startup error: ${err}`)
  exitProcessWithError('Startup error')
})
