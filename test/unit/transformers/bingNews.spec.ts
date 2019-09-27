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
    expect(await transformer.transform(result)).toEqual({
      url:
        'https://www.sun-sentinel.com/elsentinel/salud/fl-es-dengue-broward-miami-dade-20190916-hhdltrv5azb25gfubjxiaftenm-story.html',
      title:
        'Alertan sobre caso de dengue en Broward y en Miami-Dade. Mira cómo protegerte'
    })
  })
})
