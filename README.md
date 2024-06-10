# codeqc
A package using multiple 3rd party tools for checking frontend code quality metrics

Run `yarn` to install dependencies

Create `.env` file at root with the following contents:
```API_KEY_GPT=<Your GPT API key>
API_KEY_CLAUDE=<Your Claude API key>
API_KEY_GEMINI=<Your Gemini API key>
```

Run `npm link` to test on machine - this allows you to run `codeqc` command in the cmd line

Run `codeqc [FOLDER PATH] -o [NAME]` to run code review on sample code (Export full code from the Figma-to-Code plugin - either Firejet, Locofi, Builder.io, etc)
Example: `codeqc review c:\Users\xxx\Documents\codeqc\samples\login-screen -o FIREJET`

Run `npm publish` to publish npm package