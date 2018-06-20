const express = require('express');
const api = express.Router();
const leagueRouter = require('./leagueRouter');
const menusRouter = require('./menusRouter');

api.use('/leagues', leagueRouter);

module.exports = api;
