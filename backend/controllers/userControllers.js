const User = require('../models/userModels');
const { signUpValidation, loginValidation } = require('../models/userModels')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

async function sign_up(req, res) {

    //Validasi Request
    const { error } = signUpValidation(req.body)
    if (error) return res.status(400).send({ "Pesan": error.details[0].message })

    //Periksa Ketersediaan Email
    const user = await User.findOne({ email: req.body.email })
    if (user) return res.status(409).send({ "Pesan": "Email sudah digunakan" })

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    //Menyimpan Data ke Database
    const new_user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    try {
        const savedUser = await new_user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
}

async function sign_in(req, res) {

    //Validasi Request
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send({ "Pesan": error.details[0].message })

    //Menyocokkan Email Pada Database
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(409).send({ "Pesan": "Email belum terdaftar" })

    //Validasi Password
    const validasiPw = await bcrypt.compare(req.body.password, user.password)
    if (!validasiPw) return res.status(401).send({ "Pesan": "Password salah" })

    //Membuat Token
    const token = jwt.sign({ email: user.email }, process.env.TOKEN_SECRET_KEY)
    res.header('autentikasi-token', token).send({ "Token": token })

}

async function get_all_user(req, res) {

    try {
        const listUser = await User.find({})
        res.send(listUser)
    } catch (err) {
        res.status(400).send(err)
    }

}

async function get_a_user(req, res, email) {
    const user = await User.findOne({email:email})
    if (!user) return res.status(404).send({"Pesan" : "User dengan email tersebut tidak ditemukan"})

    try {
        res.send(user)
    } catch (err) {
        res.status(400).send(err)
    }

}

module.exports.sign_up = sign_up
module.exports.sign_in = sign_in
module.exports.get_all_user = get_all_user
module.exports.get_a_user = get_a_user
