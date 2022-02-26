export {}
const jwt = require('jsonwebtoken');

module.exports = (req:any, res:any, next:any) => {
	
	
			const token = req.headers?.authorization?.split?.(" ")[1];

			jwt.verify(token, process.env.tokenDecodeString, async (err:any, decodedToken:any) => {
            if(err){
               req.tokenDetails = null
            }else{
                req.tokenDetails = decodedToken
            }

            next();
        })
	
	
}