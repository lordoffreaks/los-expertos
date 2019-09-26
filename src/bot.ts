import Twit from 'twit'
import { BotConfig } from './config'

export interface SearchResult {
  url: string
  title: string
}

export interface Bot {
  run: () => Promise<void>
}

const replyFormatter = (tweet: Twit.Twitter.Status, result: SearchResult) => {
  const reply = `Hola @${tweet.user.screen_name}! "Los Expertos" hoy dicen:\r\n ${result.title} en ${result.url}`

  return reply
}

export const createBot = (
  config: BotConfig,
  logger: any,
  results: Array<SearchResult>
): Bot => {
  const authConfig = config.get('twitter')
  const T = new Twit(authConfig)

  const onTweet = async (tweet: Twit.Twitter.Status) => {
    // What is the text?
    // const txt = tweet.text;
    // the status update or tweet ID in which we will reply
    const nameID = tweet.id_str

    // Get rid of the @ mention
    // const txt = txt.replace(/@myTwitterHandle/g, "");

    const result = results[Math.floor(Math.random() * results.length)]

    // Start a reply back to the sender
    const reply = replyFormatter(tweet, result)
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
