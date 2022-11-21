const router = require('express').Router();
const { create_course } = require('../controllers/courseControllers')
const { verifyToken } = require('../auth/verifyToken')

router.post('/create', verifyToken, async (req, res) => {
    return create_course(req, res)
})

module.exports = router;