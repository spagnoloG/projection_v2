const express = require("express");
const router = express.Router();

const lyricsController = require("../controllers/lyrics");

/**
 * @swagger
 * tags:
 *   name: Lyrics
 *   description: API for managing lyrics
 */

/**
 * @swagger
 * /lyrics:
 *   post:
 *     summary: Create a new lyric
 *     tags: [Lyrics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Lyric created successfully
 *       500:
 *         description: Server error
 */
router.post("/", lyricsController.lyrics_new_lyric);

/**
 * @swagger
 * /lyrics:
 *   get:
 *     summary: Retrieve all lyrics
 *     tags: [Lyrics]
 *     responses:
 *       200:
 *         description: A list of lyrics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                 lyrics:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       content:
 *                         type: string
 *                       categories:
 *                         type: array
 *                         items:
 *                           type: string
 *       500:
 *         description: Server error
 */
router.get("/", lyricsController.lyrics_get_all_lyrics);

/**
 * @swagger
 * /lyrics/{lyricId}:
 *   get:
 *     summary: Retrieve a specific lyric by ID
 *     tags: [Lyrics]
 *     parameters:
 *       - in: path
 *         name: lyricId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the lyric to retrieve
 *     responses:
 *       200:
 *         description: Lyric data
 *       404:
 *         description: Lyric not found
 *       500:
 *         description: Server error
 */
router.get("/:lyricId", lyricsController.lyrics_get_specific_lyric);

/**
 * @swagger
 * /lyrics/{lyricId}:
 *   patch:
 *     summary: Update a specific lyric by ID
 *     tags: [Lyrics]
 *     parameters:
 *       - in: path
 *         name: lyricId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the lyric to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Lyric updated successfully
 *       404:
 *         description: Lyric not found
 *       500:
 *         description: Server error
 */
router.patch("/:lyricId", lyricsController.lyrics_update_lyric);

/**
 * @swagger
 * /lyrics/{lyricId}:
 *   delete:
 *     summary: Delete a specific lyric by ID
 *     tags: [Lyrics]
 *     parameters:
 *       - in: path
 *         name: lyricId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the lyric to delete
 *     responses:
 *       200:
 *         description: Lyric deleted successfully
 *       404:
 *         description: Lyric not found
 *       500:
 *         description: Server error
 */
router.delete("/:lyricId", lyricsController.lyrics_delete_lyric);

module.exports = router;
