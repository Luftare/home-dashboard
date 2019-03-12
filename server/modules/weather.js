const request = require('request');
const cheerio = require('cheerio');

const hourLimit = 11;
const url = 'trohs=tsacerof?4A%3C%repnevr4A%3C%j/oopse/aas/if.sotialneeteitamli//:sptth'
  .split('')
  .reverse()
  .join('');

function getWeatherData() {
  return new Promise(resolvePromise => {
    const weatherData = [...Array(hourLimit)].map(() => ({}));

    request(url, (err, res, body) => {
      if (err) console.log(err);
      const $ = cheerio.load(body);
      const times = $('.meteogram-times').find('span');
      const temperatures = $('.meteogram-temperatures').find('div');
      const descriptions = $('.meteogram-weather-symbols').find('div');
      const rainPercentages = $(
        '.meteogram-probabilities-of-precipitation'
      ).find('span');

      times.each((i, el) => {
        if (i < hourLimit) {
          weatherData[i].time = $(el).html() + '.00';
        }
      });

      temperatures.each((i, el) => {
        if (i < hourLimit) {
          const rawText = $(el).html();
          const temperature = rawText.split('&#xB0;').join('°C');
          weatherData[i].temperature = temperature;
        }
      });

      descriptions.each((i, el) => {
        if (i < hourLimit) {
          const description = $(el).attr('title');
          const trimmedDescription = description.split(',')[0];
          weatherData[i].description = trimmedDescription;
        }
      });

      rainPercentages.each((i, el) => {
        if (i < hourLimit) {
          const percentage = $(el).html();
          const trimmedPercentage = percentage
            .split('&#xA0;')
            .join('')
            .split('&lt; ')
            .join('');
          weatherData[i].rainLikelihood = trimmedPercentage;
        }
      });

      resolvePromise(weatherData);
    });
  });
}

module.exports = getWeatherData;
