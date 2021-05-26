import { execSync } from 'child_process'

// TODO carve out as GitConfig
interface GitHubConfig {
  userName: string
  accessToken: string
  fromRepo: string
  fromBranch: string
}

export default class Git {
  userName: string
  accessToken: string
  fromRepo: string
  fromBranch: string

  constructor(config: GitHubConfig) {
    this.userName = config.userName
    this.accessToken = config.accessToken
    this.fromRepo = config.fromRepo
    this.fromBranch = config.fromBranch
  }


  clone(dir: string = 'docs') {
    //TODO if dir is exists, then early return
    const command = `git clone -b ${this.fromBranch} `
      + `https://${this.userName}:${this.accessToken}@github.com/${this.fromRepo}.git ./${dir}`

    execSync(command)
  }

  copyFile(path: string, options?: { dir: string, file?: string }) {
    const { dir, file } = options
    const rawHost = 'https://raw.githubusercontent.com'
    const url = `${rawHost}/${this.fromRepo}/${this.fromBranch}/${path}`

    if (file) {
      execSync(`wget ${url} -O ${file}`)
      return
    }
    if (dir) {
      execSync(`wget ${url} -P ${dir}`)
      return
    }
    execSync(`wget ${url}`)
  }
}
