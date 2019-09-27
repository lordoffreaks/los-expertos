import axios from 'axios'
import axiosRetry from 'axios-retry'

axiosRetry(axios, { retries: 3 })

export interface TrawlingwebResults {
  response: {
    data: Array<TrawlingwebResult>
    requestLeft: number
    totalResults: number
    restResults: number
    next: string
  }
}

export interface TrawlingwebResult {
  id: string
  title: string
  text: string
  published: string
  crawled: number
  url: string
  author: string
  language: string
  domain: string
  site: string
  site_type: string
  site_language: string
  site_country: string
  site_region: string
  site_section: string
  section: string
  value: number
  rank: number
  unique_visitors: number
}

const createClient = (token: string) => {
  const instance = axios.create({
    baseURL: 'http://api.trawlingweb.com'
  })

  const baseParams = {
    format: 'json',
    sort: 'published',
    token,
    order: 'desc'
  }

  const search = async (term: string, options: any = {}) => {
    const params = {
      ...baseParams,
      ...options,
      q: `(title:"${term}") AND (site_type:news)`
    }

    const config = {
      params
    }

    const { data }: { data: TrawlingwebResults } = await instance.get(
      '/',
      config
    )

    return data.response
  }

  return { search }
}

export default createClient
