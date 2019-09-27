import { NewsArticle } from 'azure-cognitiveservices-newssearch/lib/models'
import { TrawlingwebResult } from './clients/trawlingwebClient'

export type SearchServiceResult = TrawlingwebResult | NewsArticle

export interface SearchService {
  search: (term: string) => Promise<Array<SearchServiceResult>>
}

export interface Transformer {
  transform: (result: any) => Promise<SearchResult>
  filter: (result: any) => boolean
}

export interface SearchResult {
  url: string
  title: string
}
