export {}
import * as admin from 'firebase-admin';
import config, {firebaseDatabaseUrl} from '../../firebase.config';

let app:any;


//import the service account credentials. The service account credentials are what will be used to access firebase
const initialize = () => {
	return new Promise((resolve, reject) => {
      if(!app){

        //initialize firebase with all the necessary credentials 
        app = admin.initializeApp({
          //@ts-ignore
          credential: admin.credential.cert(config),
          databaseURL: firebaseDatabaseUrl
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



//export the function for getting the initialized app
module.exports = {initialize, get_app}