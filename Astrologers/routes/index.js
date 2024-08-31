const express = require('express');
const router = express.Router();
const distributeUsers = require("../controllers/flowdistribution");
const Astro = require("../models/astro");
const User = require("../models/User");

// Data setup
let astrologers = [
    new Astro(1, 'Astrologer 1'),
    new Astro(2, 'Astrologer 2'),
    new Astro(3, 'Astrologer 3'),
    new Astro(4, 'Astrologer 4'),
];

let users = [
    new User(1, 'Akash 1'),
    new User(2, 'Vikas 2'),
    new User(3, 'Rohit 3'),
    new User(4, 'Suman 4'),
];

router.post('/distribute', (req, res) => {
    try {
        astrologers = distributeUsers(users, astrologers);
        res.json({ message: "Users distributed successfully", astrologers });
    } catch (error) {
        res.status(500).json({ message: "Failed to distribute users", error: error.message });
    }
});






/**
 * @swagger
 * /distribute:
 *   post:
 *     summary: Distribute users among astrologers
 *     description: Distributes users to astrologers based on the defined algorithm.
 *     responses:
 *       200:
 *         description: Users distributed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Users distributed successfully
 *                 astrologers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       users:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                             name:
 *                               type: string
 *       500:
 *         description: Failed to distribute users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to distribute users
 *                 error:
 *                   type: string
 *                   example: Error message
 */
module.exports = router;
