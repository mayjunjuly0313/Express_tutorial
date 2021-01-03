const { request, response } = require('express');
const express = require('express');
const app = express();
const fs = require('fs');
const template = require('./lib/template.js');
const topicRouter = require('./routes/topic');
const indexRouter = require('./routes/index');

const compression = require('compression');
const bodyParser = require('body-parser');
const helmet = require('helmet');
app.use(helmet());

//middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.get('*', (request, response, next) => {
  fs.readdir('./data', function (error, filelist) {
    request.list = filelist;
    next();
  });
});

app.use('/topic', topicRouter);
app.use('/', indexRouter);

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => console.log('Example app listening on port 3000'));
