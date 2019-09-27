import {
  StorageService,
  createStorageService
} from '../../src/services/storageService'
import config from '../../src/config'
import { SearchResult } from '../../src/models'
import { createLogger } from '../../src/logger'

const logger = createLogger(config)
describe('Storage service', () => {
  let storageService: StorageService
  const date = new Date('2018-11-03')
  const fixture: Array<SearchResult> = [
    { url: 'http://alex.com', title: 'Alex dot com' },
    { url: 'http://another.com', title: 'another dot com' }
  ]

  beforeAll(async () => {
    storageService = await createStorageService(config, logger)
  })

  afterEach(async () => await storageService.flush())

  it('should return all the fixtures for the date', async () => {
    await storageService.save(fixture.map(e => ({ ...e, date })))
    const results = await storageService.findByDate(date)
    expect(results).toEqual(fixture)
  })

  it('should return all the fixtures for the date but not different dates', async () => {
    await storageService.save(
      fixture
        .map(e => ({ ...e, date }))
        .concat([
          {
            url: 'http://.com',
            title: 'Article for 2018-11-02',
            date: new Date('2018-11-02')
          },
          {
            url: 'http://alex.com',
            title: 'Article for 2018-11-04',
            date: new Date('2018-11-04')
          }
        ])
    )
    const results = await storageService.findByDate(date)
    expect(results).toEqual(fixture)
  })
})
