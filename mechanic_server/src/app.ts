export {}
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const clientRoutes = require("./routes/client");
const mechanicRoutes = require("./routes/mechanic");
const generalRoutes = require('./routes/general');
const {initialize} = require('./adapters/firebase/app');
const {set, setRequest, MechanicRequest} = require('./adapters/firebase/firestore/firestorecontroller');


const app = express();

// interface MechanicRequest{
// 	jobId: string
// 	client: {
// 		firstname: string,
// 		lastname: string,
// 		email:string, 
// 		phone: string,
// 		id: string
// 	},
// 	mechanicId: string,
// 	vehicle: {
// 		brand: string,
// 		make: string,
// 		model: string,
// 		plateNumber: string,
// 		color: string
// 	},
// 	declined: boolean

// }

//initialize firebase app
initialize();



app.use(express.json());
app.use(cors());
app.use("/client", clientRoutes);
app.use("/mechanics", mechanicRoutes);
app.use(generalRoutes);

app.get("/", (req:any, res:any) => {
	res.json({
		message: "here"
	})
})

const port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost/mechanic-app').then(() => {

   
	app.listen(port, () => {
		process.env.tokenDecodeString = 'A good man never hits a woman Because true power doesn\'t let little things get to them Only the weak see the needd to fight and hit people in every little situation'
		console.log(`Listening on ${port}`);
	})
}).catch((err: any) => {
    console.log(err)
})
