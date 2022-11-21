const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
    const token = req.header('autentikasi-token')
    if (!token) return res.status(401).send({ "Pesan": "Akses ditolak, silahkan login terlebih dahulu" })

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
        req.user = verified
        next()
    } catch (err) {
        res.status(400).send({ "Pesan": "Token tidak valid" })
    }
}

module.exports.verifyToken = verifyToken