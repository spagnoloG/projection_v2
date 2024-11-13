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

exports.get_statistics = async (req, res) => {
  try {
    const [monthlyData, previousMonthlyData] = await Promise.all([
      db("playing_history")
        .select(db.raw("TO_CHAR(played_at, 'Mon') AS month"))
        .count("* AS count")
        .where(
          "played_at",
          ">=",
          db.raw("DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '8 months'"),
        )
        .groupBy("month")
        .orderBy("month"),
      db("playing_history")
        .count("* AS count")
        .where(
          "played_at",
          ">=",
          db.raw("DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '16 months'"),
        )
        .where(
          "played_at",
          "<",
          db.raw("DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '8 months'"),
        ),
    ]);

    const totalMonthly = monthlyData.reduce(
      (acc, row) => acc + parseInt(row.count),
      0,
    );
    const previousTotalMonthly = previousMonthlyData.reduce(
      (acc, row) => acc + parseInt(row.count),
      0,
    );
    const monthlyPercentChange = previousTotalMonthly
      ? ((totalMonthly - previousTotalMonthly) / previousTotalMonthly) * 100
      : 0;

    const [dailyData, previousDailyData] = await Promise.all([
      db("playing_history")
        .select(db.raw("TO_CHAR(played_at, 'Dy') AS day"))
        .count("* AS count")
        .where("played_at", ">=", db.raw("DATE_TRUNC('week', CURRENT_DATE)"))
        .groupBy("day")
        .orderBy("day"),
      db("playing_history")
        .count("* AS count")
        .where(
          "played_at",
          ">=",
          db.raw("DATE_TRUNC('week', CURRENT_DATE) - INTERVAL '1 week'"),
        )
        .where("played_at", "<", db.raw("DATE_TRUNC('week', CURRENT_DATE)")),
    ]);

    const totalDaily = dailyData.reduce(
      (acc, row) => acc + parseInt(row.count),
      0,
    );
    const previousTotalDaily = previousDailyData.reduce(
      (acc, row) => acc + parseInt(row.count),
      0,
    );
    const dailyPercentChange = previousTotalDaily
      ? ((totalDaily - previousTotalDaily) / previousTotalDaily) * 100
      : 0;

    const [hourlyData, previousHourlyData] = await Promise.all([
      db("playing_history")
        .select(db.raw("EXTRACT(HOUR FROM played_at) AS hour"))
        .count("* AS count")
        .where("played_at", ">=", db.raw("DATE_TRUNC('day', CURRENT_DATE)"))
        .groupBy("hour")
        .orderBy("hour"),
      db("playing_history")
        .count("* AS count")
        .where(
          "played_at",
          ">=",
          db.raw("DATE_TRUNC('day', CURRENT_DATE) - INTERVAL '1 day'"),
        )
        .where("played_at", "<", db.raw("DATE_TRUNC('day', CURRENT_DATE)")),
    ]);

    const totalHourly = hourlyData.reduce(
      (acc, row) => acc + parseInt(row.count),
      0,
    );
    const previousTotalHourly = previousHourlyData.reduce(
      (acc, row) => acc + parseInt(row.count),
      0,
    );
    const hourlyPercentChange = previousTotalHourly
      ? ((totalHourly - previousTotalHourly) / previousTotalHourly) * 100
      : 0;

    const mostCommonlyPlayed = await db("playing_history")
      .select("song_id")
      .count("* AS count")
      .groupBy("song_id")
      .orderBy("count", "desc")
      .limit(10);

    const latestDistinctSongs = await db("playing_history")
      .select("song_id")
      .from(
        db("playing_history")
          .select("song_id", "played_at")
          .distinctOn("song_id")
          .orderBy("song_id")
          .orderBy("played_at", "desc")
          .as("distinct_songs"),
      )
      .orderBy("played_at", "desc")
      .limit(10);

    const totalRows = await db("playing_history").count("* AS total").first();

    res.json({
      monthly: {
        categories: monthlyData.map((row) => row.month),
        series: monthlyData.map((row) => parseInt(row.count)),
        total: totalMonthly,
        percentChange: monthlyPercentChange,
      },
      daily: {
        categories: dailyData.map((row) => row.day),
        series: dailyData.map((row) => parseInt(row.count)),
        total: totalDaily,
        percentChange: dailyPercentChange,
      },
      hourly: {
        categories: hourlyData.map((row) => `${row.hour}:00`),
        series: hourlyData.map((row) => parseInt(row.count)),
        total: totalHourly,
        percentChange: hourlyPercentChange,
      },
      most_commonly: mostCommonlyPlayed.map((row) => row.song_id),
      latest: latestDistinctSongs.map((row) => row.song_id),
      total: parseInt(totalRows.total),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error retrieving statistics" });
  }
};
