const jwt = require('jwt-simple');
const secret = 'XXX'

module.exports = {
  requiresLogin: (req, res, next) => {
    console.log(req.headers.authorization)
    const token = jwt.decode(req.headers.authorization.split(' ')[1], secret);
    console.log(token)
    req.user = token
    if (token) return next()

    res.sendStatus(401)
  }
}