const express = require('express');
const app = express();

require('dotenv/config');
require('./db');
require('./config')(app);

const Celebrity = require("./models/Celebrity.model");
const Movie = require('./models/Movie.model'); 
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
const newMovie = new Movie({
    title: 'The Godfather',
    genre: 'Crime',
    plot: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    cast: ['6161f9a9c9d9c5d5d5d5d5d5', '6161f9a9c9d9c5d5d5d5d5d6'],
  });
  
  newMovie.save()
    .then(() => {
      console.log('New movie created successfully');
    })
    .catch((error) => {
      console.log(error);
    });

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
const moviesRouter = require('./routes/movies.routes');

app.use('/', index);
app.use('/celebrities', celebritiesRouter);
app.use('/movies', moviesRouter);
app.locals.title = 'Lab Movies Celebrities - Generated with Ironlauncher';

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something went wrong!');
});

module.exports = app;