var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var dotenv = require('dotenv');
dotenv.config();

// Configuration
const TURN_SECRET = process.env.TURN_SECRET;
const TURN_TTL = parseInt(process.env.TURN_TTL) || 86400; // 24 hours

/**
 * GET /turn - Retrieve ephemeral TURN credentials
 * 
 * Query parameters:
 * - service: should be "turn" (required by spec)
 * - pairId: pair identifier for debugging/tracking
 * 
 */
router.get('/', function(req, res, next) {
  try {
    // Validate required parameters
    if (req.query.service !== 'turn' || !req.query.pairId) {
      return res.status(400).json({
        error: 'Invalid parameters. Must include "service=turn" and "pairId"'
      });
    }

    // Generate expiration timestamp (current time + TTL)
    const expiration = Math.floor(Date.now() / 1000) + TURN_TTL;
    
    // Create username: timestamp:pairId format
    const pairId = req.query.pairId;
    const turnUsername = `${expiration}:${pairId}`;
    
    // Generate password using HMAC-SHA1(secret, username) and base64 encode
    const hmac = crypto.createHmac('sha1', TURN_SECRET);
    hmac.update(turnUsername);
    const turnPassword = hmac.digest('base64');
    
    // Prepare response
    const response = {
      iceServerConfig: {
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          {
            urls: [process.env.TURN_SERVER_URL],
            username: turnUsername,
            credential: turnPassword,
          }
        ],
        iceTransportPolicy: "relay"  // allow all (STUN, TURN, and direct)
      }
    };
    
    // Set appropriate headers
    res.set({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    
    res.json(response);
    
  } catch (error) {
    next(error);
  }
});

module.exports = router;
