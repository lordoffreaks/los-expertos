import { AppConfig } from '../config'
import { Transformer } from '../models'
import { NewsArticle } from 'azure-cognitiveservices-newssearch/lib/models'
import { AppLogger } from '../logger'

export const createBingNewsSearchTransformer = (
  _: AppConfig,
  __: AppLogger
): Transformer => {
  const transform = async (
    { url, name, description, _type }: NewsArticle,
    term: string
  ) => {
    const title = name && name.indexOf(term) !== -1 ? name : description

    return {
      url: url || _type,
      title: title || _type
    }
  }

  const filter = ({ url, name }: NewsArticle) => {
    return !!url && !!name
  }

  return { transform, filter }
}
