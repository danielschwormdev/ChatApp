const express = require('express');
const router = express.Router();

// request und response mit Nachricht --> Routen
router.get('/', (req, res) => {
    res.send('server is up and running');
});

module.exports = router;