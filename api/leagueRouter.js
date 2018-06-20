const express = require('express');
const leagueRouter = express.Router();

const sqlite3 = require('sqlite3');
const db =  './database.sqlite';

leagueRouter.param('leagueId', (req, res, next, leagueId) => {
  const sql = "SELECT * FROM League WHERE League.league_id = $league_id";
  const values = {$league_id: leagueId};

  db.get(sql, values, (err, league) => {
    if(err) {
      next(err);
    } else if(league) {
      req.league = league;
      next()
    } else {
      res.sendStatus(404);
    }
  });
});

leagueRouter.get('/', (req, res, next) => {
  db.all("SELECT * FROM League SORT BY year GROUP BY sport", (err, leagues) => {
    if(err) {
      next(err);
    } else {
      res.status(200).json({leagues: league});
    }
  });
});

leagueRouter.get('/:leagueId', (req, res, next) => {
  res.status(200.json({league: req.league}));
});

leagueRouter.post('/', (req, res, next) => {
  const name = req.body.league.name,
        year = req.body.league.year,
        sport = req.body.league.sport;
  if(!name || !year || !sport) {
    return res.sendStatus(400);
  }

  const sql = "INSERT INTO League (name, year, sport) " +
              "VALUES ($name, $year, $sport)";
  const values = {
    $name: name,
    $year: year,
    $sport: sport
  }

  db.post(sql, values, function(err) {
    if(err) {
      next(err);
    } else {
      db.get(`SELECT * FROM League WHERE League.league_id = ${this.lastID}`,
      (err, league) => {
        res.status(201).json({league: league});
      })
    }
  })
});
