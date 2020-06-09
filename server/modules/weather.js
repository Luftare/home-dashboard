const fetch = require('node-fetch');

const hourLimit = 11;
const url =
  'https://www.ilmatieteenlaitos.fi/api/weather/forecasts?place=J%C3%A4rvenper%C3%A4&area=Espoo';

function parseTime(str) {
  const timeStr = str.split('T')[1];
  const hours = timeStr.substr(0, 2);
  const minutes = timeStr.substr(2, 2);
  return `${hours}.${minutes}`;
}

function roundTens(value) {
  const num = parseInt(value);
  return Math.round(num / 10) * 10;
}

function getWeatherData() {
  return new Promise((resolvePromise) => {
    return fetch(url)
      .then((data) => data.json())
      .then((data) => {
        const { symbolDescriptions, table } = data;
        const forecasts = table.slice(0, hourLimit);

        const response = forecasts.map(
          ({ PoP, Temperature, SmartSymbol, localtime }) => ({
            time: parseTime(localtime),
            temperature: `${Temperature}°C`,
            rainLikelihood: `${roundTens(PoP)}%`,
            description: symbolDescriptions.find(
              (desc) => desc.id === SmartSymbol
            ).text_fi,
          })
        );

        resolvePromise(response);
      });
  });
}

module.exports = getWeatherData;
