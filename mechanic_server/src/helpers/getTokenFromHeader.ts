export {}
const jwt = require('jsonwebtoken');


// this function gets the token details from the header and returns the details to whatever function called it
module.exports = (req:any) => {
	return new Promise((resolve, reject) => {
		
			const token = req.headers?.authorization?.split?.(" ")[1];

			jwt.verify(token, process.env.tokenDecodeString, async (err:any, decodedToken:any) => {
            if(err){
                resolve(null)
            }else{
                resolve(decodedToken)
            }
        })
	})
	
}