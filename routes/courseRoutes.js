const router = require('express').Router();
const {  } = require('../controllers/courseControllers')
const { verifyToken } = require('../auth/verifyToken')

router.post('/create', verifyToken, async (req, res) => {
    res.json({Pesan : "Ngetes"})
})

module.exports = router;