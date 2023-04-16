const express = require('express');
const app = express();

require('dotenv/config');
require('./db');
require('./config')(app);

const Celebrity = require("./models/Celebrity.model");

const celebrities = [
  {
    name: "Tom Cruise",
    occupation: "Actor",
    catchPhrase: "Show me the money!",
  },
  {
    name: "Beyonce",
    occupation: "Singer",
    catchPhrase: "Who run the world? Girls!",
  },
  {
    name: "Daffy Duck",
    occupation: "Cartoon character",
    catchPhrase: "You're despicable!",
  },
];

Celebrity.insertMany(celebrities)
  .then((celebrities) => {
    console.log(`${celebrities.length} celebrities added to the database`);
  })
  .catch((error) => {
    console.log(error);
  });

const hbs = require('hbs');

const index = require('./routes/index');
const celebritiesRouter = require('./routes/celebrities.routes');

app.use('/', index);
app.use('/celebrities', celebritiesRouter);

app.locals.title = 'Lab Movies Celebrities - Generated with Ironlauncher';

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something went wrong!');
});

module.exports = app;