const router = require('express').Router();
const { sign_in, sign_up, get_all_user, get_a_user } = require('../controllers/userControllers')
const { verifyToken } = require('../auth/verifyToken')

router.post('/signup', async (req, res) => {
    return sign_up(req, res)
})

router.post('/signin', async (req, res) => {
    return sign_in(req, res)   

})

router.get('/', verifyToken, async (req, res) => {
    return get_all_user(req,res)
})

router.get('/:email', verifyToken, async (req, res) => {
    return get_a_user(req,res, req.params.email)
})

module.exports = router;