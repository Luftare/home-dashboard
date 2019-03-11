const google = require('googleapis').google;
const fs = require('fs');

const TOKEN_PATH = __dirname + '/token.json';

function getEvents() {

  return new Promise((res) => {
    fs.readFile(__dirname + '/credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      authorize(JSON.parse(content), listEvents.bind(this, res));
    });
  })
}

function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  fs.readFile(TOKEN_PATH, (err, token) => {
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

function listEvents(callback, auth) {
  const calendar = google.calendar({version: 'v3', auth});
  calendar.events.list({
    calendarId: '7f3k6mi6lrf9im8sjv58tnm668@group.calendar.google.com',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const events = res.data.items;
    callback(events, err);
  });
}

module.exports = getEvents;