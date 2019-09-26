import convict from 'convict'

export interface BotConfig extends convict.Config<ConfigSchema> {
  logCurrentConfig?: Function
}

export interface ConfigSchema {
  logLevel: string
  twitter: {
    consumer_key: string
    consumer_secret: string
    access_token: string
    access_token_secret: string
  }
  timber: {
    api_key: string
    source_id: string
  }
  webpack: { output: { path: string } }
}

const config: BotConfig = getConfig()
config.logCurrentConfig = logCurrentConfig

export default config

function getConfig(): BotConfig {
  return convict({
    logLevel: {
      doc: 'Log level to start logging at.',
      format: ['debug', 'info', 'warn', 'error'],
      env: 'LOG_LEVEL',
      default: 'debug'
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
    webpack: {
      output: {
        path: {
          doc: 'Webpack output path',
          format: String,
          env: 'WEBPACK_OUTPUT_PATH',
          default: 'dist/public'
        }
      }
    }
  })
}
function logCurrentConfig(log = console) {
  const configToLog = JSON.parse(config.toString())
  log.info('Current config:', configToLog)
}
