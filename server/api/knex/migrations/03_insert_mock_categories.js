/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex("lyric-category").insert([
    { category: "Rock" },
    { category: "Pop" },
    { category: "Alternative" },
    { category: "Indie" },
    { category: "Jazz" },
    { category: "Classical" },
    { category: "Electronic" },
    { category: "Chill" },
    { category: "Blues" },
    { category: "Ambient" },
    { category: "Acoustic" },
    { category: "Folk" },
    { category: "Dance" },
    { category: "Instrumental" },
    { category: "Country" },
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex("lyric-category")
    .whereIn("category", [
      "Rock",
      "Pop",
      "Alternative",
      "Indie",
      "Jazz",
      "Classical",
      "Electronic",
      "Chill",
      "Blues",
      "Ambient",
      "Acoustic",
      "Folk",
      "Dance",
      "Instrumental",
      "Country",
    ])
    .del();
};
