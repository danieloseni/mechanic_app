import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyB9CQiAzHM_ISxw6g2rLRn5hbSVpKih9a8",
    authDomain: "mechanic-app-49aec.firebaseapp.com",
    databaseURL: "https://mechanic-app-49aec-default-rtdb.firebaseio.com",
    projectId: "mechanic-app-49aec",
    storageBucket: "mechanic-app-49aec.appspot.com",
    messagingSenderId: "865028714676",
    appId: "1:865028714676:web:96416b664a820d16c967e1",
    measurementId: "G-EFMK0119H7"
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;