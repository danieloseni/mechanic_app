export {}
//imort the jwt library
const jwt = require('jsonwebtoken');
import config from '../config'
const {tokenDecodeString} = config

//this function get the token from the request header, and makes it available to the controller by appending the details to the request object
module.exports = (req:any, res:any, next:any) => {
	
			//get the token from the authorization value in the header
			const token = req.headers?.authorization?.split?.(" ")[1];

			//ensure that the token is valid and decodable
			jwt.verify(token, tokenDecodeString, async (err:any, decodedToken:any) => {
            if(err){
            	//if there's an error, it means the token is invalid, therefore add null to the request object
               req.tokenDetails = null
            }else{
            	//if no errors get the details encoded inside the token and append it to the request object
                req.tokenDetails = decodedToken
            }

           	//push the newly generated strutured request object to the controller
            next();
        })
	
	
}