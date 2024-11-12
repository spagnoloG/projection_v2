const express = require("express");
const router = express.Router();

const appStateController = require("../controllers/appState");

/**
 * @swagger
 * tags:
 *   name: AppState
 *   description: API for managing application state
 */

/**
 * @swagger
 * /state:
 *   get:
 *     summary: Retrieve the current application state
 *     tags: [AppState]
 *     responses:
 *       200:
 *         description: Current app state data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: integer
 *                 appName:
 *                   type: string
 *                 organisation:
 *                   type: string
 *                 marginLeft:
 *                   type: integer
 *                 marginRight:
 *                   type: integer
 *       404:
 *         description: App state not found
 *       500:
 *         description: Server error
 */
router.get("/", appStateController.app_state_get_state);

/**
 * @swagger
 * /state:
 *   patch:
 *     summary: Update the application state
 *     tags: [AppState]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               appName:
 *                 type: string
 *               organisation:
 *                 type: string
 *               marginLeft:
 *                 type: integer
 *               marginRight:
 *                 type: integer
 *     responses:
 *       200:
 *         description: State updated successfully
 *       500:
 *         description: Server error
 */
router.patch("/", appStateController.app_state_update_state);

module.exports = router;
