import DeepLTranslator from "../Translator/DeepLTranslator"
import Factory from "./Factory"
import Translator from "../Translator/Translator"

export type TranslatorType = 'deepl'

export default class TranslatorFactory extends Factory<Translator> {
  create(type: TranslatorType, key?: string) {
    if (type === 'deepl') {
      return new DeepLTranslator(key)
    }
    console.error(`Type ${type} is not supported. Please use TranslatorType which is supported.`)
  }
}
