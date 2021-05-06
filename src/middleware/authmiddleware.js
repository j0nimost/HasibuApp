const jwt = require('jsonwebtoken');
const appError = require('../utils/appError');

function authenticateToken(req, res, next) {
    const auth_header = req.headers.authorization;

    if(auth_header) {
        const auth_token = auth_header.split(' ')[1];

        jwt.verify(auth_token, process.env.SECRET, (err, user) => {
            if(err) {
                return next(new appError(401, 'UnAuthorized', 'Limited Access/Token Invalid'));
            }

            req.userId = user.id;

            next();
        });

    }
    else
    {
        // return error
        return next(new appError(403, 'UnAuthorized Action', 'Token is required'));
    }
}

module.exports = authenticateToken;