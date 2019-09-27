import axios from 'axios'
import cheerio from 'cheerio'
import { AppConfig } from '../config'
import { Transformer } from '../models'
import { TrawlingwebResult } from '../clients/trawlingwebClient'
import { AppLogger } from '../logger'

export const createTrawlingwebTransformer = (
  _: AppConfig,
  __: AppLogger
): Transformer => {
  const parseUrl = async (url: string) => {
    const html = await axios.get(url)
    const $ = cheerio.load(html.data)

    const href = $('a')
      .eq(1)
      .attr('href')
    return href
  }

  const transform = async ({ url, title }: TrawlingwebResult) => {
    return {
      url: await parseUrl(url),
      title
    }
  }

  const filter = ({ url, title }: TrawlingwebResult) => {
    return !!url && !!title
  }

  return { transform, filter }
}
