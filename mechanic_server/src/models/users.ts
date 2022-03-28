export {}
const {model, Schema} = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
	firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	},
	role: String
});

UserSchema.pre('save', async function(this: any, next:any){

    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next()

})

//Method to log in user
UserSchema.statics.login = async function(email:string, password:string){
    const user = await this.findOne({email})

    if(user){
      const auth =  await bcrypt.compare(password, user.password)
      if(auth){
      		delete user.password;
          return user;
      }

      throw Error("Incorrect password")

    }

    throw Error("Incorrect email")
}

module.exports = model("user", UserSchema);
