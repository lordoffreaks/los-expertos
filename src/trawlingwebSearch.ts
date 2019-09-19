import createClient from './trawlingwebClient'

const client = createClient(process.env.TRAWLINGWEB_WEB_KEY)

const search_term = 'Los Expertos'

client
  .search(search_term)
  .then(({ data }) => {
    console.log(JSON.stringify(data))
  })
  .catch(err => console.error(err))
