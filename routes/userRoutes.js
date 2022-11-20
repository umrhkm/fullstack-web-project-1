const router = require('express').Router();
const User = require('../models/userModels');
const { signUpValidation, loginValidation } = require('../models/userModels')

router.post('/signup', async (req, res) => {

    const { error } = signUpValidation(req.body)
    if (error) return res.status(400).send({ "Error": error.details[0].message })

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
})

router.post('/signin', (req, res) => {
    res.send('ngetes2')
})

module.exports = router;