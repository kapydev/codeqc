# codeqc

A package using multiple 3rd party tools for checking frontend code quality metrics

1. Clone the GitHub [Link to GitHub](https://github.com/kapydev/codeqc)

2. Run `yarn` to install dependencies

3. Create `.env` file at root with the following contents:

```
API_KEY_GPT=<Your GPT API key>
API_KEY_CLAUDE=<Your Claude API key>
API_KEY_GEMINI=<Your Gemini API key>
```

4. Run `npm link` to test on machine - this allows you to run `codeqc` command in the cmd line

5. Run `codeqc [CODE FOLDER PATH] -o [MARKDOWN FILE NAME]` to run code review on sample code (Export full code from the Figma-to-Code plugin - either Firejet, Locofi, Builder.io, etc)
   Example: `codeqc review c:\Users\xxx\Documents\codeqc\samples\login-screen -o firejet-test-1-landing-page`
