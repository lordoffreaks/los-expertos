import nock from 'nock'
import fixture from '../../fixtures/trawlingweb'
import { createTrawlingwebTransformer } from '../../../src/transformers/trawlingweb'
import config from '../../../src/config'
import { Transformer } from '../../../src/models'
import { createLogger } from '../../../src/logger'

describe('transformer', () => {
  let transformer: Transformer
  const logger = createLogger(config)
  const html = `<html>
  <head>
    <title>Trawling web redirection...</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <meta http-equiv="refresh" content="10;url=http://www.diariodelaltoaragon.es/NoticiasDetalle.aspx?Id=1180478" />
  </head>
  <body>
  <div class="container">
    <div class="row">
      Content ofered by <a href="http://trawlingweb.com">Trawling Web</a>
    </div>
    <div class="row">
      Redirecting in 10 seconds...
    </div>
    <div class="row">
      <a href="http://www.diariodelaltoaragon.es/NoticiasDetalle.aspx?Id=1180478">Go to url</a>
    </div>
  </div>
  </body>
  </html>`

  beforeAll(() => {
    transformer = createTrawlingwebTransformer(config, logger)
  })

  test('does NOT fail', async () => {
    nock('http://url.trawlingweb.com')
      .get(
        '/9be0ac1283e4c31435943cbb9de67a83edb47a045ad2ea73bec713cdbc28cb5c6fdfdfb56e71c911571f5c53c804b331d78a47b8c9e9d2a59ea1c5ea276270e5588962b257234a4868e036016264248c'
      )
      .reply(200, html)
    const results = fixture()
    const result = JSON.parse(results)[0]
    expect(await transformer.transform(result, 'Los Expertos')).toEqual({
      url: 'http://www.diariodelaltoaragon.es/NoticiasDetalle.aspx?Id=1180478',
      title:
        'Los expertos apuntan que las diferencias de género pueden influir en la mayor mortalidad de mujeres'
    })
  })
})
