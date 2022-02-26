export {}
const jwt = require('jsonwebtoken');

module.exports = (req:any) => {
	return new Promise((resolve, reject) => {
		console.log(req.headers);
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