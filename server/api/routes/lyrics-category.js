import express, { response } from "express";
import db from "../knex/db";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: LyricCategories
 *   description: API for managing lyric categories
 */

/**
 * @swagger
 * /lyricsc:
 *   get:
 *     summary: Retrieve all lyric categories
 *     tags: [LyricCategories]
 *     responses:
 *       200:
 *         description: A list of lyric categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: integer
 *                   category:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get("/", async (req, res) => {
  db("lyric-category")
    .select("_id", "category")
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

/**
 * @swagger
 * /lyricsc:
 *   post:
 *     summary: Create a new lyric category
 *     tags: [LyricCategories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 description: Category name for lyrics
 *     responses:
 *       201:
 *         description: Category created successfully
 *       500:
 *         description: Server error
 */
router.post("/", async (req, res) => {
  const lyricC = {
    category: req.body.category,
  };

  db("lyric-category")
    .insert(lyricC)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

/**
 * @swagger
 * /lyricsc/{recievedCategory}:
 *   delete:
 *     summary: Delete a specific lyric category
 *     tags: [LyricCategories]
 *     parameters:
 *       - in: path
 *         name: recievedCategory
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the category to delete
 *     responses:
 *       200:
 *         description: Lyric category deleted successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
router.delete("/:recievedCategory", async (req, res) => {
  db("lyric-category")
    .where("category", "=", req.params.recievedCategory)
    .del(["_id"])
    .then((result) => {
      if (result.n === 0) {
        res.status(404).json({
          message: "No valid entry found for provided id",
        });
      } else {
        res.status(200).json({
          message: "Lyric successfully deleted!",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
