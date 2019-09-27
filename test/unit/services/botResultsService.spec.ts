import MockDate from 'mockdate'
import config from '../../../src/config'
import {
  createResultsService,
  BotResultsService
} from '../../../src/services/botResultsService'

describe('bot results service', () => {
  let service: BotResultsService
  beforeAll(() => {
    service = createResultsService(config)
  })

  describe('tranform date', () => {
    const constantDate = '2019-11-03T04:12:46.000Z'
    beforeAll(() => MockDate.set(constantDate))
    afterAll(MockDate.reset)
    it('should handle today', () => {
      expect(service.transformDate(new Date())).toBe('2019-11-03')
    })
    it('should handle other date', () => {
      expect(service.transformDate(new Date('2019-03-05T04:12:46.000Z'))).toBe(
        '2019-03-05'
      )
    })
  })
})
