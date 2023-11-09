const axios = require('axios');
const cron = require('node-cron');
const { webhookURL, cronSchedulder, translateEnabled, translateLanguage, deeplApiKey } = require('./config')



const getApod = () => {

  const optionsNasa = {
    method: 'GET',
    url: 'https://api.nasa.gov/planetary/apod',
    params: {api_key: 'QiF1HEue6kHfF34BqvzxAxbAqCscvo0YDMS7zFj8'},
    headers: {'User-Agent': 'insomnia/8.3.0'}
  };

  axios.request(optionsNasa).then(function (responseNasa) {

    const title = responseNasa.data.title
    const description = responseNasa.data.explanation
    const url = responseNasa.data.url
    const imageUrl = responseNasa.data.hdurl
    const credits = responseNasa.data.copyright || "NASA";
    const date = new Date()

    if (translateEnabled) {
      const optionsDeepl = {
        method: 'GET',
        url: 'https://api-free.deepl.com/v2/translate',
        params: {
          auth_key: deeplApiKey,
          text: description,
          target_lang: translateLanguage
        },
        headers: {'User-Agent': 'insomnia/8.3.0'}
      };

      axios.request(optionsDeepl).then(function (responseDeepl) {

        const translatedDescription = responseDeepl.data.translations[0].text

        sendMessageToDiscord(title, translatedDescription, url, imageUrl, credits, date)

      }).catch(function (error) {
        console.error(error);
      });
    } else {
      sendMessageToDiscord(title, description, url, imageUrl, credits, date)
    }




  }).catch(function (error) {

    console.error(error);

  });


}

// Fonction pour envoyer le message au Webhook Discord
const sendMessageToDiscord = (title, description, url, imageUrl, credits, date) => {

  axios.post(webhookURL, {
    "content": null,
    "embeds": [
      {
        "title": title,
        "description": description,
        "url": "https://apod.nasa.gov/apod/astropix.html",
        "color": 1072088,
        "footer": {
          "text": "‎\n© " + credits
        },
        "timestamp": date,
        "image": {
          "url": imageUrl
        },
        "thumbnail": {
          "url": "https://api.nasa.gov/assets/img/favicons/favicon-192.png"
        }
      }
    ],
    "attachments": []
  })
  .then(response => {
    console.log('Message envoyé avec succès');
  })
  .catch(error => {
    console.error('Erreur lors de l\'envoi du message :\n', error);
  });
}

// Planifier l'envoi du message tous les matins à 08h00
cron.schedule(cronSchedulder, () => {
  getApod()
});

console.log('Serveur démarré...');