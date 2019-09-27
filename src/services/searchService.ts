import { createBingNewsSearchService } from './bingNewsSearch'
import { createTrawlingwebService } from './trawlingwebSearch'
import { AppConfig } from '../config'
import { createBingNewsSearchTransformer } from '../transformers/bingNewsSearch'
import { createTrawlingwebTransformer } from '../transformers/trawlingweb'
import { AppLogger } from '../logger'

export const createSearchService = (config: AppConfig, logger: AppLogger) => {
  const bingTransformer = createBingNewsSearchTransformer(config, logger)
  const bing = createBingNewsSearchService(config, logger, bingTransformer)

  const trawlingwebTransformer = createTrawlingwebTransformer(config, logger)
  const trawlingweb = createTrawlingwebService(
    config,
    logger,
    trawlingwebTransformer
  )

  const search = async (term: string) => {
    const [bingResults, trawlingwebResults] = await Promise.all([
      bing.search(term),
      trawlingweb.search(term)
    ])
    return [...bingResults, ...trawlingwebResults]
  }

  return {
    search
  }
}
