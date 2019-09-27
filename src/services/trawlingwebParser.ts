import urls from '../../search.json'
import axios from 'axios'
import cheerio from 'cheerio'
import { SearchResult } from '../models.js'

const parseUrl = async (result: SearchResult) => {
  const html = await axios.get(result.url)
  const $ = cheerio.load(html.data)

  const url = $('a')
    .eq(1)
    .attr('href')
  return {
    ...result,
    url
  }
}

const results = urls.map(parseUrl)

Promise.all(results)
  .then(r => console.log(JSON.stringify(r)))
  .catch(err => console.error(err))
