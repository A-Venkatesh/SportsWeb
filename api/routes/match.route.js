const express = require('express');
const app = express();
const matchRoutes = express.Router();

// Require match model in our routes module
let Match = require('../models/Match');

// Defined store route
matchRoutes.route('/add').post(function (req, res) {
  let match = new Match(req.body);  
  match.save()
    .then(match => {
      res.status(200).json({'Match': 'Match has been added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
matchRoutes.route('/').get(function (req, res) {
  Match.find(function (err, matchs){
    if(err){
      console.log(err);
    }
    else {
      res.json(matchs);
    }
  });
});

// Defined edit route
matchRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Match.findById(id, function (err, match){
      res.json(match);
  });
});

//  Defined update route
matchRoutes.route('/update/:id').post(function (req, res) {
  Match.findById(req.params.id, function(err, match) {
    if (!match)
      res.status(404).send("Record not found");
    else {
        match.id = req.body.id;
        match.season = req.body.season;
        match.city = req.body.city;
        match.date = req.body.date;
        match.team1 = req.body.team1;
        match.team2 = req.body.team2;
        match.toss_winner = req.body.toss_winner;
        match.toss_decision = req.body.toss_decision;
        match.result = req.body.result;
        match.dl_applied = req.body.dl_applied;
        match.winner = req.body.winner;
        match.win_by_runs = req.body.win_by_runs;
        match.win_by_wickets = req.body.win_by_wickets;
        match.player_of_match = req.body.player_of_match;
        match.venue = req.body.venue;
        match.umpire1 = req.body.umpire1;
        match.umpire2 = req.body.umpire2;
        match.umpire3 = req.body.umpire3;        

      match.save().then(match => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
matchRoutes.route('/delete/:id').get(function (req, res) {
    Match.findByIdAndRemove({_id: req.params.id}, function(err, match){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = matchRoutes;