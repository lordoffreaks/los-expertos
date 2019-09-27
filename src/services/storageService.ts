import mongoose from 'mongoose'
import { AppConfig } from '../config'
import { SearchResult } from '../models'
import { BulkWriteOpResultObject } from 'mongodb'
import { AppLogger } from '../logger'

export interface StorageService {
  save: (results: Array<SearchResult>) => Promise<BulkWriteOpResultObject>
  findByDate: (data: Date) => Promise<Array<any>>
  flush: () => Promise<void>
}

export const createStorageService = async (
  config: AppConfig,
  logger: AppLogger,
): Promise<StorageService> => {
  try {
    const uristring = config.get('mongodb_uri')
    await mongoose.connect(uristring, {
      useNewUrlParser: true
      // useUnifiedTopology: true
    })

    // CONNECTION EVENTS
    mongoose.connection.on('error', err => {
      logger.error('Error after the inital connection', err)
    })

    // When successfully connected
    mongoose.connection.on('connected', function() {
      logger.info('Mongoose default connection open')
    })

    // When the connection is disconnected
    mongoose.connection.on('disconnected', function() {
      logger.info('Mongoose default connection disconnected')
    })
  } catch (err) {
    logger.error('ERROR connecting:', err)
  }

  // This is the schema.  Note the types, validation and trim
  // statements.  They enforce useful constraints on the data.
  const resultSchema = new mongoose.Schema({
    url: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    title: {
      type: String,
      trim: true,
      required: true
    },
    date: { type: Date, required: true }
  })

  // Compiles the schema into a model, opening (or creating, if
  // nonexistent) the 'Results' collection in the MongoDB database
  const Results = mongoose.model('Results', resultSchema)

  const save = async (r: Array<SearchResult>) => {
    const documents = r.map(document => {
      return {
        insertOne: {
          document
        }
      }
    })

    return await Results.bulkWrite(documents)
  }

  const findByDate = async (date: Date) => {
    var nextDay = new Date(date.getTime())
    nextDay.setDate(nextDay.getDate() + 1)

    const documents = await Results.find({
      date: { $gte: date, $lt: nextDay }
    })

    return documents.map(document => {
      return {
        title: document.get('title'),
        url: document.get('url')
      }
    })
  }

  const flush = async () => await Results.collection.drop()

  return {
    save,
    findByDate,
    flush
  }
}
