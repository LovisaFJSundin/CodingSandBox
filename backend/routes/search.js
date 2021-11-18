const express = require('express');

const router = express.Router();

router.get('/search/', (req, res, next)=> {
    console.log('GET request')
    res.json({
        msg: "hi"
    })
});

module.exports = router;