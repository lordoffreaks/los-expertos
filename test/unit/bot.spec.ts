import Twit from 'twit'
import { getRandomResult, replyFormatter } from '../../src/bot'

describe('The bot', () => {
  it('Random result does not crash', () => {
    expect(() => getRandomResult([])).not.toThrow()
    expect(() =>
      getRandomResult([{ url: 'http://www.example.com', title: 'One Title' }])
    ).not.toThrow()
    expect(() =>
      getRandomResult([
        { url: 'http://www.example.com', title: 'One Title' },
        { url: 'http://www.example2.com', title: 'Title two' }
      ])
    ).not.toThrow()
  })

  describe('Reply formatter', () => {
    it('Reply formatter', () => {
      const tweet = {
        user: { screen_name: 'Alex' }
      } as Twit.Twitter.Status
      const result = { url: 'http://www.example.com', title: 'One Title' }
      expect(replyFormatter(tweet, result)).toEqual('Hola @Alex! "Los Expertos" hoy dicen:\r\n "One Title" en http://www.example.com')
    })
  })
})
