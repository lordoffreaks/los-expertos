import config from '../../../src/config'
import {
  createBingNewsSearchService,
  BingNewsSearchService
} from '../../../src/services/bingNewsSearch'
import { createBingNewsSearchTransformer } from '../../../src/transformers/bingNewsSearch'
import { createLogger } from '../../../src/logger'

describe.skip('bing results service', () => {
  const logger = createLogger(config)
  let service: BingNewsSearchService
  beforeAll(() => {
    const bingTransformer = createBingNewsSearchTransformer(config, logger)
    service = createBingNewsSearchService(config, logger, bingTransformer)
  })

  describe('tranform date', () => {
    it('should handle today', async () => {
      expect(await service.search('Los Expertos')).toEqual([])
    })
  })
})
