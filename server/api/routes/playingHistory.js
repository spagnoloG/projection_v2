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

/**
 * @swagger
 * /playing-history/statistics:
 *   get:
 *     summary: Retrieve song play statistics
 *     tags: [PlayingHistory]
 *     responses:
 *       200:
 *         description: Statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 monthly:
 *                   type: object
 *                   properties:
 *                     categories:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: ["Jan", "Feb", "Mar", ...]
 *                     series:
 *                       type: array
 *                       items:
 *                         type: integer
 *                         example: [22, 8, 35, ...]
 *                     total:
 *                       type: integer
 *                       example: 714000
 *                     percentChange:
 *                       type: number
 *                       format: float
 *                       example: -2.6
 *                 daily:
 *                   type: object
 *                   properties:
 *                     categories:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: ["Mon", "Tue", "Wed", ...]
 *                     series:
 *                       type: array
 *                       items:
 *                         type: integer
 *                         example: [5, 7, 10, ...]
 *                     total:
 *                       type: integer
 *                       example: 1000
 *                     percentChange:
 *                       type: number
 *                       format: float
 *                       example: 1.5
 *                 hourly:
 *                   type: object
 *                   properties:
 *                     categories:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: ["0:00", "1:00", "2:00", ...]
 *                     series:
 *                       type: array
 *                       items:
 *                         type: integer
 *                         example: [3, 2, 5, ...]
 *                     total:
 *                       type: integer
 *                       example: 120
 *                     percentChange:
 *                       type: number
 *                       format: float
 *                       example: -0.5
 *                 most_commonly:
 *                   type: array
 *                   items:
 *                     type: integer
 *                     example: [1, 2, 3, ...]
 *                 latest:
 *                   type: array
 *                   items:
 *                     type: integer
 *                     example: [9, 7, 5, ...]
 *                 total:
 *                   type: integer
 *                   description: Overall total rows in the playing_history table
 *                   example: 1000000
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error retrieving statistics"
 */
router.get("/statistics", playingHistoryController.get_statistics);

module.exports = router;
