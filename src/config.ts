import convict from 'convict'

export interface BotConfig extends convict.Config<ConfigSchema> {
  logCurrentConfig?: Function
}

export interface ConfigSchema {
  nodeEnv: string
  env: string
  port: number
  logLevel: string
  twitter: {
    consumer_key: string
    consumer_secret: string
    access_token: string
    access_token_secret: string
  }
  webpack: { output: { path: string } }
}

const config: BotConfig = getConfig()
config.logCurrentConfig = logCurrentConfig

export default config

function getConfig(): BotConfig {
  return convict({
    nodeEnv: {
      doc:
        'Running in an environment, or on a developer machine? Mainly used to decide log structure etc',
      format: ['production', 'dev'],
      env: 'NODE_ENV',
      default: 'production'
    },
    env: {
      doc: 'The deployment environment',
      format: ['live', 'local'],
      env: 'ENV_NAME',
      default: 'local'
    },
    port: {
      doc: 'Port for starting the app on.',
      format: 'port',
      env: 'PORT',
      default: 8000
    },
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
