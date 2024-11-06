const express = require("express");
const router = express.Router();

const playlistController = require("../controllers/playlists");

/**
 * @swagger
 * tags:
 *   name: Playlists
 *   description: API for managing playlists
 */

/**
 * @swagger
 * /playlists:
 *   post:
 *     summary: Create a new playlist
 *     tags: [Playlists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Array of song IDs in the playlist
 *               playlistName:
 *                 type: string
 *                 description: Name of the playlist
 *               playlistDescription:
 *                 type: string
 *                 description: Description of the playlist
 *     responses:
 *       201:
 *         description: Playlist created successfully
 *       500:
 *         description: Server error
 */
router.post("/", playlistController.playlists_new_playlist);

/**
 * @swagger
 * /playlists:
 *   get:
 *     summary: Retrieve all playlists
 *     tags: [Playlists]
 *     responses:
 *       200:
 *         description: A list of playlists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                 playlists:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: integer
 *                       ids:
 *                         type: array
 *                         items:
 *                           type: integer
 *                       playlistName:
 *                         type: string
 *                       playlistDescription:
 *                         type: string
 *       500:
 *         description: Server error
 */
router.get("/", playlistController.playlists_get_all_playlists);

/**
 * @swagger
 * /playlists/{playlistId}:
 *   get:
 *     summary: Retrieve a specific playlist by ID
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the playlist to retrieve
 *     responses:
 *       200:
 *         description: Playlist data
 *       404:
 *         description: Playlist not found
 *       500:
 *         description: Server error
 */
router.get("/:playlistId", playlistController.playlists_get_specific_playlist);

/**
 * @swagger
 * /playlists/{playlistId}:
 *   patch:
 *     summary: Update a specific playlist by ID
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the playlist to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *               playlistName:
 *                 type: string
 *               playlistDescription:
 *                 type: string
 *     responses:
 *       200:
 *         description: Playlist updated successfully
 *       500:
 *         description: Server error
 */
router.patch("/:playlistId", playlistController.playlists_update_playlist);

/**
 * @swagger
 * /playlists/{playlistId}:
 *   delete:
 *     summary: Delete a specific playlist by ID
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the playlist to delete
 *     responses:
 *       200:
 *         description: Playlist deleted successfully
 *       404:
 *         description: Playlist not found
 *       500:
 *         description: Server error
 */
router.delete("/:playlistId", playlistController.playlists_delete_playlist);

module.exports = router;
