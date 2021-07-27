const router = require('express').Router();
const Exercise = require('../models/exercise.js');

router.post('/api/workouts', (req, res) => {
  Exercise.create({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    
});



router.get('/api/workouts/range', (req, res) => {
  Exercise.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: '$exercises.duration',
        },
      },
    },
  ])
    .sort({ _id: -1 })
    .limit(10)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    
});

router.put('/api/workouts/:id', ({ body, params }, res) => {
  Exercise.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body } },

    { new: true, runValidators: true }
  )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    });

    router.get('/api/workouts', (req, res) => {
      Exercise.aggregate([
        {
          $addFields: {
            totalDuration: {
              $sum: '$exercises.duration',
            },
          },
        },
      ])
        .then((dbWorkout) => {
          res.json(dbWorkout);
        })
        
    });
    

module.exports = router;
