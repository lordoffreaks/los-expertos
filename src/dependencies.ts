import { AppConfig } from './config'
import { createSearchService } from './services/searchService'
import { createStorageService } from './services/storageService'
import { AppLogger } from './logger'

export const createDependencies = async (config: AppConfig, logger: AppLogger) => {
  const searchService = createSearchService(config, logger)
  const storageService = await createStorageService(config, logger)

  return {
    searchService,
    storageService
  }
}
