const express = require('express');
const router = express.Router();

const Movie = require('../models/movie');


router.get('/', (req, res, next) => {

  Movie.find({})
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {

  Movie.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  const title = req.body.title;
  const year = Number(req.body.year);
  const posterUrl = req.body.posterUrl;

  if(!title || !year || !posterUrl) {
    res.status(422).json({code:'unprocessable-entity'});
  }
  const newMovie = new Movie({ title, year, posterUrl });

  newMovie.save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch(next);
});



module.exports = router;