import axios from 'axios'

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

    const { data } = await instance.get('/', config)

    return data.response
  }

  return { search }
}

export default createClient
