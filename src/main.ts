import { extractFileName, readFile, removeDir, scanDirectory, writeFile } from './file'
import GitHub from './GitHub'
import Translator from './Translator'
import TranslatorFactory from './TranslatorFactory'

export async function run() {
  const githubConfig = {
    userName: process.env.GITHUB_USER_NAME,
    accessToken: process.env.GITHUB_ACCESS_TOKEN,
    fromRepo: process.env.GITHUB_FROM_REPO,
    fromBranch: process.env.GITHUB_FROM_BRANCH
  }

  const translationConfig = {
    type: process.env.API_TYPE,
    deepl: {
      key: process.env.DEEPL_API_KEY
    }
  }

  const dir = process.env.OUTPUT_DIR
  const lang = (process.env.TARGET_LANG as string).toLowerCase()

  const git = new GitHub(githubConfig)

  const factory = new TranslatorFactory()
  const translator = factory.create(translationConfig.type as any, translationConfig[translationConfig.type].key)

  console.log('cloning repo...')
  git.clone(dir)
  const reg = new RegExp(process.env.INCLUDE)

  const targets: string[] = scanDirectory(dir)
    .filter(target => target.match(reg))

  for(const target of targets) {
    console.log(`process ${target}...(lang: ${lang})`)
    await operate(translator, target, lang) 
  }

  removeDir(dir)
}

async function operate(translator: Translator, target: string, lang: string) {
  const text = readFile(target)

  const result = await translator.translate(text, lang)

  writeFile(`${lang}/${target}`, result)
}
