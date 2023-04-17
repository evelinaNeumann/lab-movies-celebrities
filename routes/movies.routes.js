const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie.model.js');

// GET /movies/create - show the form to create a movie
router.get('/create', (req, res, next) => {
  res.render('movies/new-movie');
});

// POST /movies/create - create a new movie
router.post('/create', (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  const newMovie = new Movie({ title, genre, plot, cast });
  newMovie.save()
    .then(() => {
      res.redirect('/movies');
    })
    .catch((error) => {
      next(error);
    });
});
// GET /movies - show all movies
router.get('/', (req, res, next) => {
    Movie.find()
      .then((movies) => {
        res.render('movies/index', { movies });
      })
      .catch((error) => {
        next(error);
      });
  });
  
  // GET /movies/:id - show a specific movie
  router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    Movie.findById(id)
      .populate('cast')
      .then((movie) => {
        res.render('movies/show', { movie });
      })
      .catch((error) => {
        next(error);
      });
  });
  
  module.exports = router;