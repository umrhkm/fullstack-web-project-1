const router = require('express').Router();
const { create_course, approve_course, get_all_course, get_a_course } = require('../controllers/courseControllers')
const { verifyToken } = require('../auth/verifyToken')

router.post('/create', verifyToken, async (req, res) => {
    return create_course(req, res)
})

router.get('/', async (req,res) => {
    return get_all_course(req,res)
})

router.get('/:name', async (req,res) => {
    return get_a_course(req,res, req.params.name)
})

router.put('/approve/:id', verifyToken, async (req, res) => {
    return approve_course(req, res, req.params.id)
})

module.exports = router;