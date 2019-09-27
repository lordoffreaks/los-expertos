import { NowRequest, NowResponse } from '@now/node'
import { createDependencies } from '../src/dependencies'
import config from '../src/config'
import { createLogger } from '../src/logger'

const logger = createLogger(config)
export default async (req: NowRequest, res: NowResponse) => {
  const { storageService } = await createDependencies(config, logger)
  try {
    let date: Date
    if (!req.query.date) {
      date = new Date()
    } else {
      date = new Date(req.query.date.toString())
    }

    const results = await storageService.findByDate(date)
    res.json(results)
  } catch (err) {
    logger.error('Error', err)
    throw err
  }
}
