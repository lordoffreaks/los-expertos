import { NowRequest, NowResponse } from '@now/node'
import { createDependencies } from '../src/dependencies'
import config from '../src/config'
import { createLogger } from '../src/logger'

const logger = createLogger(config)
export default async (_: NowRequest, res: NowResponse) => {
  const { searchService, storageService } = await createDependencies(
    config,
    logger
  )
  try {
    const date = new Date()
    const results = await searchService.search('Los Expertos')
    await storageService.save(results.map(r => ({ ...r, date })))
    res.json(`${results.length} processed`)
  } catch (err) {
    logger.error('Error', err)
    throw err
  }
}
