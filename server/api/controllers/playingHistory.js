const db = require("../knex/db");

exports.log_song_play = (req, res) => {
  const { song_id } = req.body;

  db("playing_history")
    .insert({ song_id })
    .then(() => {
      res.status(201).json({ message: "Song play logged successfully" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Error logging song play" });
    });
};
