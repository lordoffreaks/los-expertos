import { CognitiveServicesCredentials } from 'ms-rest-azure'
import NewsSearchAPIClient from 'azure-cognitiveservices-newssearch'
const credentials = new CognitiveServicesCredentials(
  process.env.BING_SEARCH_NEWS_KEY
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

const search = async (term: string, options: SearchOptions) => {
  const result = await client.newsOperations.search(term, options)
  console.log(JSON.stringify(result.value))
}

const search_term = 'Los Expertos'
const options = {
  safeSearch: 'Strict',
  mkt: 'es-ES',
  count: 100
} as SearchOptions

search(search_term, options).catch((err: any) => console.log(err))
