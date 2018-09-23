
const express = require('express');
const path = require('path');
const app = express();
const port = 8888;

app.listen(port, () => console.log(`Serving at port ${port}`));

app.use('/', express.static(path.join(__dirname, '../client/build')));