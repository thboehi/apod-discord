# APOD to Discord
Ever wanted to send the APOD to your Discord server ? Juste use this to send every morning (can be changed) the APOD to your server. Best of all ? Automatically translate the APOD for best results in your Discord server !

---

- NASA Astronomy Pic of the Day
- Discord
- Deepl Translation

---

## How To

1. Clone this repo
2. [Edit config.js](#configjs)
3. Launch the app `npm start`

---

## config.js

### webhookUrl
[Create a webhook on your Discord channel](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)

### cronSchedulder
[Choose when your APOD will be send to te Discord channel](https://crontab.guru/)

## translateEnabled
Choose if translation is enabled or not (if false, the message will be sent in english, this is the default NASA API language.)

## translateLanguage
- DE (German)
- EN (English)
- ES (Spanish)
- FR (French)
- IT (Italian)
- JA (Japanese)
- NL (Dutch)
- PL (Polish)
- PT (Portuguese)
- RU (Russian)
- ZH (Chinese)

## deeplApiKey
Read the [Deepl API docs](https://www.deepl.com/docs-api) (really easy to use)