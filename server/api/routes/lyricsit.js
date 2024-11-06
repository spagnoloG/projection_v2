import express from "express";
import db from "../knex/db";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: LyricsIndex
 *   description: API for retrieving lyrics titles and indexes
 */

/**
 * @swagger
 * /lyricsit:
 *   get:
 *     summary: Retrieve all lyrics titles and indexes, excluding content
 *     tags: [LyricsIndex]
 *     responses:
 *       200:
 *         description: A list of lyrics titles and indexes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: integer
 *                     description: ID of the lyric
 *                   title:
 *                     type: string
 *                     description: Title of the lyric
 *                   categories:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: Categories associated with the lyric
 *       500:
 *         description: Server error
 */
router.get("/", async (req, res) => {
  db("lyrics")
    .select("_id", "title", "categories")
    .orderBy("_id", "asc")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
