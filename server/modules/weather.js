const request = require('request');

const hourLimit = 11;
const url =
  'https://www.ilmatieteenlaitos.fi/api/weather/forecasts?place=j%C3%A4rvenper%C3%A4&area=espoo';

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
    return request(url, { json: true }, (err, res, body) => {
      if (err) console.log(err);
      const { symbolDescriptions, forecastValues } = body;
      const forecasts = forecastValues.slice(0, hourLimit);

      const todayForecast = forecastValues[0];
      const todayDateString = todayForecast.localtime.split('T')[0];
      const firstForecastOfTomorrow = forecastValues.find(f => f.localtime.split('T')[0] !== todayDateString) || todayForecast;

      const dayLengthDifferenceTomorrow = firstForecastOfTomorrow.DayLength - todayForecast.DayLength;

      const parsedForecasts = forecasts.map(
        ({ PoP, Temperature, SmartSymbol, localtime }) => ({
          time: parseTime(localtime),
          temperature: `${Temperature}°C`,
          rainLikelihood: `${roundTens(PoP)}%`,
          description: symbolDescriptions
            .find((desc) => desc.id === SmartSymbol)
            .text_fi.split(',')[0]
            .trim(),
        })
      );

      const response = {
        forecasts: parsedForecasts,
        dayLength: body.dayLength.lengthofday,
        sunrise: body.dayLength.sunrise,
        sunset: body.dayLength.sunset,
        dayLengthDifferenceTomorrow,
      };

      resolvePromise(response);
    });
  });
}

module.exports = getWeatherData;
