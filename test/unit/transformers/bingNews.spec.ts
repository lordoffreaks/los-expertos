import fixture from '../../fixtures/bingNewsSearch'
import { createBingNewsSearchTransformer } from '../../../src/transformers/bingNewsSearch'
import config from '../../../src/config'
import { Transformer } from '../../../src/models'
import { createLogger } from '../../../src/logger'

const logger = createLogger(config)

describe('transformer', () => {
  let transformer: Transformer

  beforeAll(() => {
    transformer = createBingNewsSearchTransformer(config, logger)
  })

  test('true', async () => {
    const result = JSON.parse(fixture())[0]
    expect(await transformer.transform(result, 'Los Expertos')).toEqual({
      url:
        'https://www.sun-sentinel.com/elsentinel/salud/fl-es-dengue-broward-miami-dade-20190916-hhdltrv5azb25gfubjxiaftenm-story.html',
      title:
        'incluido el uso de repelente de insectos”, advierten los expertos. DRENAR AGUA DE LLUVIA: agua de los botes de basura, de la casa, botes de basura y otros recipientes que puedan recoger agua, canales, cubiertas de piscinas, refrigeradores, juguetes ...'
    })
  })
})
