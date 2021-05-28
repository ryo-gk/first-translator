export default abstract class Translator {
  abstract translate(text: string, lang: string): Promise<string>
}
