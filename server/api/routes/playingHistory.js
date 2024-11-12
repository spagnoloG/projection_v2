const express = require("express");
const router = express.Router();
const playingHistoryController = require("../controllers/playingHistory");

/**
 * @swagger
 * /playing-history:
 *   post:
 *     summary: Log a song play
 *     tags: [PlayingHistory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               song_id:
 *                 type: integer
 *                 description: ID of the song being played
 *     responses:
 *       201:
 *         description: Song play logged successfully
 *       500:
 *         description: Server error
 */
router.post("/", playingHistoryController.log_song_play);

module.exports = router;
