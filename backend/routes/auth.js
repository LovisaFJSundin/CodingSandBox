const express = require('express');

const router = express.Router();

router.get('/', (req, res, next)=> {
    console.log('GET request')
    res.json({
        msg: "hi"
    })
});

module.exports = router;