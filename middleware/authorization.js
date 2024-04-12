const jwt = require('jsonwebtoken');

const authorization = (req, res, next) => {
    try {
        if(req.url.includes('admin') || req.url.includes('cart') || req.url.includes('checkout')) {
            let decoded = jwt.verify(req.headers.authorization, 'secret');

            if (!decoded) {
                return res.json({
                    status: 404,
                    message: "Please login first"
                })
            }
        }
        
        next();
    } catch (error) {
        console.log(error);
        return res.json({
            status: 404,
            message: "Please Login first"
        })
    }
}

module.exports = {
    authorization
}