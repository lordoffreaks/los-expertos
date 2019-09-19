import Twit from 'twit'
import { BotConfig } from './config'

export interface Bot {
  run: () => Promise<void>
}

export const createBot = (config: BotConfig, logger: any): Bot => {
  const authConfig = config.get('twitter')
  const T = new Twit(authConfig)

  const onTweet = (tweet: Twit.Twitter.Status) => {
    logger.info(JSON.stringify(tweet))
  }

  const run = async () => {
    const stream = T.stream('statuses/filter', { track: 'Los Expertos' })
    stream.on('tweet', onTweet)
  }

  return { run }
}
