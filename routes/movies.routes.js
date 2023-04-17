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
  
// GET /movies/:id - show details of a specific movie
router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    Movie.findById(id).populate('cast')
      .then((movie) => {
        res.render('movies/movie-details', { movie });
      })
      .catch((error) => {
        next(error);
      });
  });

  // POST /movies/:id/delete - delete a specific movie
router.post('/:id/delete', (req, res, next) => {
  const { id } = req.params;
  Movie.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

// GET /movies/:id/edit - show a form to edit a specific movie
router.get('/:id/edit', (req, res, next) => {
    const { id } = req.params;
    Movie.findById(id)
      .then((movie) => {
        Celebrity.find()
          .then((celebrities) => {
            res.render('movies/edit-movie', { movie, celebrities });
          })
          .catch((error) => {
            next(error);
          });
      })
      .catch((error) => {
        next(error);
      });
  });

  // POST /movies/:id/edit - update a specific movie
router.post('/:id/edit', (req, res, next) => {
    const { id } = req.params;
    const { title, genre, plot, cast } = req.body;
    Movie.findByIdAndUpdate(id, { title, genre, plot, cast })
      .then(() => {
        res.redirect(`/movies/${id}`);
      })
      .catch((error) => {
        next(error);
      });
  });

  module.exports = router;