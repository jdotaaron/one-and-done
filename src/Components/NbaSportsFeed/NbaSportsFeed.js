const accessCode = "amRvdDpBYXIwbjgxMkBoMG0z";

let season = '2018-playoff';
const apiUrl = `'https://api.mysportsfeeds.com/v1.2/pull/nba/` +
               `${season}/`;

const headers = {headers: {Authorization: `Basic ${accessCode}`}};

export function NbaSportsFeed = {
  getPlayerStats(name, date) => {
    const player = name.split(' ').join(',');
    const endpoint = 'daily_player_stats.json';
    const params = `?fordate=${date}&player=${player}`;
    const url = apiUrl + params;

    return fetch(url, headers)
              .then(response => response.json())
              .then(results => {
                let player = results.dailyplayerstats.playerstatsentry[0];
                if(player) {
                  return ({
                    points: player.stats.Pts,
                    rebounds: player.stats.Reb,
                    assists: player.stats.Ast
                  });
                } else {
                  return [];
                }
              });
  },

  getGamesByDate(date) {
    const endpoint = 'daily_game_schedule.json';
    const params = `?fordate=${date}`;
    const url = apiUrl + endpoint + params;

    return fetch(url, headers).then(response => response.json())
            .then(results => {
              let games = results.dailygameschedule.gameentry;
                if(games) {
                  return games.map(game => {
                    // status: game.status,
                    awayCity: game.awayTeam.City,
                    awayName: game.awayTeam.Name,
                    homeCity: game.homeTeam.City,
                    homeName: game.homeTeam.Name,
                    time: game.time
                  });
              } else {
                return [];
              }
            });
  },

  getRoster(date, team) {
    const endpoint = 'roster_players.json';
    const params = `?fordate=${date}&${team}`;
    const url = apiUrl + endpoint + params;

    return fetch(url, headers).then(response => jsonResponse())
            .then(results => {
              let roster = results.rosterplayers.playerentry;
              if (roster) {
                return roster.map(player => {
                  firstName: player.player.FirstName,
                  lastName: player.player.LastName,
                  number: player.player.JerseyNumber,
                  position: player.player.position
                });
              } else {
                return [];
              }
            });
  }


}
