import Translator from './Translator'
import axios from 'axios'

export default class DeelLTranslater extends Translator {
  private key: string
  constructor(key: string) {
    super()
    this.key = key
  }

  async translate(text: string, lang: string): Promise<string> {
    console.log('translating...')
    const result = await this.requestTranslation(text, lang)
    return result
  }

  private async requestTranslation(text: string, lang: string): Promise<string> {
    const params = new URLSearchParams()
    params.append('auth_key', this.key)
    params.append('text', text)
    params.append('target_lang', lang)

    try {
      const res = await axios.post('https://api-free.deepl.com/v2/translate', params)
      return res.data.translations[0].text
    } catch (error) {
      console.error(error)
    }
  }
}
