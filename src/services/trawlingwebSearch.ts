import createClient from '../clients/trawlingwebClient'
import { AppConfig } from '../config'
import { Transformer, SearchResult } from '../models'
import { AppLogger } from '../logger'

export const createTrawlingwebService = (
  config: AppConfig,
  _: AppLogger,
  transformer: Transformer
) => {
  const client = createClient(config.get('trawlingweb_web_key'))
  const search = async (term: string): Promise<Array<SearchResult>> => {
    const { data } = await client.search(term)
    return Promise.all(
      data.filter(transformer.filter).map(r => transformer.transform(r, term))
    )
  }

  return { search }
}
