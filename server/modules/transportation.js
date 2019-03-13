const { ApolloClient } = require('apollo-boost');
const gql = require('graphql-tag');

const { HttpLink } = require('apollo-link-http');
const fetch = require('node-fetch');
const { InMemoryCache } = require('apollo-cache-inmemory');

global.fetch = fetch;

function zeroPad(num) {
  const padded = '0' + num;
  return padded.substr(-2);
}

function timestampToTimeString(num) {
  const hours = Math.floor(num / 60 / 60);
  const minutes = Math.floor(((num / 60 / 60) % 1) * 60);
  return `${zeroPad(hours)}.${zeroPad(minutes)}`;
}

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql'
  }),
  cache: new InMemoryCache()
});

function getUpcomingTransportation() {
  return new Promise(resolvePromise => {
    client
      .query({
        query: gql`
          {
            stop(id: "HSL:2632250") {
              name
              stoptimesWithoutPatterns(numberOfDepartures: 8) {
                scheduledArrival
                realtimeArrival
                arrivalDelay
                headsign
                trip {
                  route {
                    shortName
                  }
                }
              }
            }
          }
        `
      })
      .then(({ data }) => {
        const rawArrivals = data.stop.stoptimesWithoutPatterns;
        const upcomingTransportation = rawArrivals.map(entry => {
          return {
            scheduledArrivalText: timestampToTimeString(entry.scheduledArrival),
            bussNumber: entry.trip.route.shortName,
            delayInSeconds: entry.arrivalDelay,
            destination: entry.headsign
          };
        });
        resolvePromise(upcomingTransportation);
      })
      .catch(error => console.error(error));
  });
}

module.exports = getUpcomingTransportation;
