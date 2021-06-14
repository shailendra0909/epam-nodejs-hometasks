const jwt = require('jsonwebtoken');


const jwtSecret = process.env.JWT_SECRET;

const generateAccessToken = (loginName) => {
    const payload = { user: loginName }
    return jwt.sign(payload, jwtSecret, { expiresIn: 120 });
}

authenticationMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    console.log('**** authenticationMiddleware',token)

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, jwtSecret, (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        req.user = user;
        next()
    });
}

module.exports = {
    authenticationMiddleware,
    generateAccessToken
}