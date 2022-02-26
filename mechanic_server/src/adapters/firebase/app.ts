export {}
import * as admin from 'firebase-admin';
const path = require('path');

let app:any;

const serviceAccount = require("./firebase-service-account-key.json");

const initialize = () => {
	return new Promise((resolve, reject) => {
      if(!app){
        console.log('here')
        app = admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          databaseURL: "https://mechanic-app-49aec-default-rtdb.firebaseio.com"
        });

         setTimeout(() => {
            resolve("")
        }, 5000)
      }else{
        resolve("")
      }

     
  })
	
}

const get_app = () => {
	return app;
}


module.exports = {initialize, get_app}