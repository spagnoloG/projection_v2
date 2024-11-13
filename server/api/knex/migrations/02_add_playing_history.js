/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("playing_history", function (table) {
    table.increments("_id");
    table
      .integer("song_id")
      .notNullable()
      .references("_id")
      .inTable("lyrics")
      .onDelete("CASCADE");
    table.timestamp("played_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("playing_history");
};
