import Twit from 'twit'
import { BotConfig } from './config'

export interface Bot {
  run: () => Promise<void>
}

export const createBot = (config: BotConfig, logger: any): Bot => {
  const authConfig = config.get('twitter')
  config.logCurrentConfig()
  logger.info('authConfig', authConfig)
  const T = new Twit(authConfig)

  const onTweet = async (tweet: Twit.Twitter.Status) => {
    const name = tweet.user.screen_name
    // What is the text?
    // const txt = tweet.text;
    // the status update or tweet ID in which we will reply
    const nameID = tweet.id_str

    // Get rid of the @ mention
    // const txt = txt.replace(/@myTwitterHandle/g, "");

    // Start a reply back to the sender
    const reply =
      'You mentioned me! @' +
      name +
      ' ' +
      'You are super cool! But not as cool as "Los Expertos"'
    const params = {
      status: reply,
      in_reply_to_status_id: nameID
    }

    try {
      await T.post('statuses/update', params)
      console.log('Tweeted: ' + params.status)
    } catch (err) {
      logger.error(err)
    }
  }

  const run = async () => {
    const stream = T.stream('statuses/filter', { track: '@LExpertos' })
    stream.on('tweet', onTweet)
  }

  return { run }
}
