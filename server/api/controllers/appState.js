const db = require("../knex/db");

exports.app_state_get_state = (req, res, next) => {
  db("app")
    .select("_id", "appName", "organisation", "marginLeft", "marginRight")
    .first()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: "App state not found!",
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.app_state_update_state = (req, res, next) => {
  const props = req.body;

  db("app")
    .update(props)
    .whereExists(db("app").select(1)) // Ensures the table has an entry to update
    .then((updated) => {
      if (updated) {
        res.status(200).json({
          message: "State updated",
        });
      } else {
        res.status(404).json({
          message: "App state not found!",
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: err,
      });
    });
};
