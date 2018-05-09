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

  if (!title || !year || !posterUrl) {
    res.status(422).json({ code: 'unprocessable-entity' });
  }

  // when error res.status(401).json({code: "already exist, etc"})

  const newMovie = new Movie({ title, year, posterUrl });

  newMovie.save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  const newData = {
    title: req.body.title,
    year: Number(req.body.year),
    posterUrl: req.body.posterUrl
  }

  //to get the new one instead of the original
  const options = {
    new: true,
  }

  Movie.findById(req.params.id)
    .then((result) => {

      if (!result) {
        return res.status(404).json({ code: 'notfound' });
      }

      result.title = newData.title;
      result.year = newData.year;
      result.posterUrl = newData.posterUrl;

      result.save()
        .then(() => {
          res.json(result);
        })
        .catch(next);
    })
    .catch(next);
});

router.delete('/:id', (req, res, next) => {

  Movie.findById(req.params.id)
  .then((result) => {

    if (!result) {
      return res.status(404).json({ code: 'notfound' });
    }
    
    result.remove()
      .then(() => {
        res.json(result);
      })
      .catch(next);
  })
    .catch(next);
});


module.exports = router;