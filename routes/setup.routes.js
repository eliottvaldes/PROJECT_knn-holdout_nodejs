const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.json({
        msg: 'GET | setup'
    });
});


module.exports = router;