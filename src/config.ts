import convict from 'convict'

export interface AppConfig extends convict.Config<ConfigSchema> {
  logCurrentConfig?: Function
}

interface ConfigSchema {
  logLevel: string
  timber: {
    api_key: string
    source_id: string
  }
  twitter: {
    consumer_key: string
    consumer_secret: string
    access_token: string
    access_token_secret: string
  }
  bing_search_news_key: string
  trawlingweb_web_key: string
  mongodb_uri: string
  result_by_date_enpoint: string
}

const config: AppConfig = getConfig()
config.logCurrentConfig = logCurrentConfig

export default config

function getConfig(): AppConfig {
  return convict({
    logLevel: {
      doc: 'Log level to start logging at.',
      format: ['debug', 'info', 'warn', 'error'],
      env: 'LOG_LEVEL',
      default: 'debug'
    },
    result_by_date_enpoint: {
      doc: 'Endpoint to bring the results from.',
      format: String,
      env: 'DATE_ENDPOINT',
      default: 'https://the-experts-bot.lordoffreaks.now.sh/api/date'
    },
    timber: {
      api_key: {
        doc: 'The api key',
        format: String,
        env: 'TIMBER_API_KEY',
        default: '',
        sensitive: true
      },
      source_id: {
        doc: 'The source id',
        format: String,
        env: 'TIMBER_SOURCE_ID',
        default: '',
        sensitive: true
      }
    },
    twitter: {
      consumer_key: {
        doc: 'The consumer key',
        format: String,
        env: 'APP_CONSUMER_KEY',
        default: '',
        sensitive: true
      },
      consumer_secret: {
        doc: 'The consumer secret',
        format: String,
        env: 'APP_CONSUMER_SECRET',
        default: '',
        sensitive: true
      },
      access_token: {
        doc: 'The access token',
        format: String,
        env: 'APP_ACCESS_TOKEN',
        default: '',
        sensitive: true
      },
      access_token_secret: {
        doc: 'The access token secret',
        format: String,
        env: 'APP_ACCESS_TOKEN_SECRET',
        default: '',
        sensitive: true
      }
    },
    bing_search_news_key: {
      doc: 'Bing Search News key',
      format: String,
      env: 'BING_SEARCH_NEWS_KEY',
      sensitive: true,
      default: ''
    },
    trawlingweb_web_key: {
      doc: 'trawlingweb key',
      format: String,
      env: 'TRAWLINGWEB_WEB_KEY',
      sensitive: true,
      default: ''
    },
    mongodb_uri: {
      doc: 'MONGODB URI',
      format: String,
      env: 'MONGODB_URI',
      sensitive: true,
      default:
        'mongodb://root:example@localhost:27017/heroku_dtzf4dns?authSource=admin'
    }
  })
}
function logCurrentConfig(log = console) {
  const configToLog = JSON.parse(config.toString())
  log.info('Current config:', configToLog)
}
