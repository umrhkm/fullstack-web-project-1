const router = require('express').Router();
const { sign_in, sign_up } = require('../controllers/userControllers')

router.post('/signup', async (req, res) => {
    return sign_up(req, res)
})

router.post('/signin', async (req, res) => {
    return sign_in(req, res)   

})

module.exports = router;