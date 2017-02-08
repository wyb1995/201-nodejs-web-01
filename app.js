let mongoose = require('mongoose');
let express = require('express');
let config = require('config');
let router = require('./router');
let bodyParser = require('body-parser');

mongoose.connect(config.get('mongoUri'));

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send({
    'hello': 'world'
  })
})

router(app);

app.listen(config.get('httpPort'), () => {
  console.log('server started at http://localhost:' + config.get('httpPort'));   // eslint-disable-line no-console
})

module.exports = app;