# First Translator
You can use this translator for translating any document on GitHub.
This creates the translated files by using the translate API such as DeepL.

## How to use
1. Set env
Set below environment variable.
 ```
GITHUB_USER_NAME ... User name of GitHub
GITHUB_ACCESS_TOKEN ... Access token of Github
GITHUB_FROM_REPO ... The repository to translate on GitHub
GITHUB_FROM_BRANCH ... The branch of the repository to translate on GitHub

API_TYPE ... The type of API use for translating. Refer to below "API type" section
TARGET_LANG ... The language which you want to translate
DEEPL_API_KEY ... The API key of DeepL. This is necessary if you use DeepL as API type

# APP
OUTPUT_DIR ... The directory. Under this, the translated files are created.  
INCLUDE ... The regex. Only the file which matched this is translated. For example, if .md is target, write '.+\.md'

 ```

 2. Run
 To run, execute `yarn start`.

 ## API type
 Support API is below. (Now, DeepL only...)
 - DeepL (https://www.deepl.com/docs-api/)
 