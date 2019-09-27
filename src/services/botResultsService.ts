import axios from 'axios'
import { AppConfig } from '../config'
import { SearchResult } from '../models'
import axiosRetry from 'axios-retry'

axiosRetry(axios, { retries: 3 })

export type BotResultsService = {
  fetch: (date?: Date) => Promise<Array<SearchResult>>
  transformDate: (date: Date) => string
}

export const createResultsService = (config: AppConfig) => {
  const instance = axios.create({
    baseURL: config.get('result_by_date_enpoint')
  })

  instance.defaults.headers.common['User-Agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:69.0) Gecko/20100101 Firefox/69.0'
  instance.defaults.headers.common['Upgrade-Insecure-Requests'] = 1

  const fetch = async (date?: Date) => {
    const params = {
      ...(date && { date: transformDate(date) })
    }

    const results = await instance.get('/api/date', { params })
    return results.data
  }

  const transformDate = (date: Date): string => {
    return date.toISOString().slice(0, 10)
  }

  return {
    fetch,
    transformDate
  }
}
