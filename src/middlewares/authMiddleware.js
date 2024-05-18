const { SECRET } = require('../constants')
const jwt = require('../utils/jwt')

exports.auth = async (req,res,next) => {
    const token = req.cookies['auth']
    
    if (token) {
        const decodedToken = await jwt.verify(token, SECRET)
        req.user = decodedToken
        res.locals.isAuthenticated = true 
        next()
    } else {
        next()
    }
}