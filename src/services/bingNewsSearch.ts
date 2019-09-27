import { CognitiveServicesCredentials } from 'ms-rest-azure'
import NewsSearchAPIClient from 'azure-cognitiveservices-newssearch'
import { AppConfig } from '../config'
import { Transformer, SearchResult } from '../models'
import { AppLogger } from '../logger'

export type BingNewsSearchService = {
  search: (term: string) => Promise<Array<SearchResult>>
}

export const createBingNewsSearchService = (
  config: AppConfig,
  _: AppLogger,
  transformer: Transformer
) => {
  const credentials = new CognitiveServicesCredentials(
    config.get('bing_search_news_key')
  )
  const client = new NewsSearchAPIClient(credentials)

  type Freshness = 'Day' | 'Week' | 'Month'
  type SafeSearch = 'Strict' | 'Moderate' | 'Off'
  type SearchOptions = {
    freshness?: Freshness
    safeSearch?: SafeSearch
    mkt?: string
    count?: number
  }

  const search = async (term: string) => {
    const options = {
      safeSearch: 'Strict',
      mkt: 'es-ES',
      count: 100
    } as SearchOptions
    const result = await client.newsOperations.search(term, options)
  
    const transformed = await Promise.all(result.value.filter(transformer.filter).map(r => transformer.transform(r, term)))
    return transformed
  }

  return { search }
}
