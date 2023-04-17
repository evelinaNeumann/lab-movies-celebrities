const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity.model');

// GET /celebrities/create - show the form to create a celebrity
router.get('/create', (req, res, next) => {
  res.render('celebrities/new-celebrity');
});

// POST /celebrities/create - create a new celebrity
router.post('/create', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  const newCelebrity = new Celebrity({ name, occupation, catchPhrase });
  newCelebrity.save()
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch((error) => {
      next(error);
    });
});

// GET /celebrities - show all celebrities
router.get('/', (req, res, next) => {
    Celebrity.find()
      .then((celebrities) => {
        res.render('celebrities/index', { celebrities });
      })
      .catch((error) => {
        next(error);
      });
  });

  // POST /celebrities/:id/delete - delete a specific celebrity
router.post('/:id/delete', (req, res, next) => {
    const { id } = req.params;
    Celebrity.findByIdAndDelete(id)
      .then(() => {
        res.redirect('/celebrities');
      })
      .catch((error) => {
        next(error);
      });
  });
// GET /celebrities/:id - show a specific celebrity
router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    Celebrity.findById(id)
      .then((celebrity) => {
        res.render('celebrities/show', { celebrity });
      })
      .catch((error) => {
        next(error);
      });
  });

// PUT /celebrities/:id - update a celebrity
router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.findByIdAndUpdate(id, { name, occupation, catchPhrase }, { new: true })
    .then((celebrity) => {
      res.redirect(`/celebrities/${celebrity._id}`);
    })
    .catch((error) => {
      next(error);
    });
});

// DELETE /celebrities/:id - delete a celebrity
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  Celebrity.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;