const baseUrl = 'http://localhost:5000/api';

export function OneAndDone = {
  getPicks(username, leagueId) {
    const userId = db.get("SELECT user_id FROM User WHERE username = $username",
                          {$username: username});
    const sql = "SELECT * FROM Picks WHERE Picks.user_id = $userId AND " +
                "Picks.league_id = $leagueId";
    const values = {
      $userId: userId,
      $leagueId: leagueId
    }

    db.get(sql, values, (err, picks) => {
      return
    })
  }
}
