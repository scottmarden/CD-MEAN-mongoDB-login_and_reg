const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');

let UserSchema = new Schema({
	first_name: {
		type: String,
		required: [true, "First name is required"],
		minlength: [2, "First name must be at least 4 characters long"],
		trim: true
	},
	last_name: {
		type: String,
		required: [true, "Last name is required"],
		minlength: [2, "Last name must be at least 4 characters long"],
		trim: true
	},
	email: {
		type: String,
		required: [true, "Email is required"],
		unique: true,
		trim: true,
		validate: [{
			validator: function( email ){
				return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test( email );
			},
			message: "Please enter a valid email"
		}]
	},
	password: {
		type: String,
		required: [true, "Password is required"],
		minlength: [8, "Password must be at least 8 characters long"],
	},
	birthday: {
		type: Date,
		required: [true, "Birthday is required"],
		validate: {
			validator: function ( value ){
				return value < new Date();
			},
			message: "You must choose a day prior to today"
		}
	},
	pw_confirm: {type: String}
},
{timestamps: true});

UserSchema.pre("save", function(next){
	if (this.password != this.pw_confirm){
		this.invalidate("password","passwords still don't match")
		next(new Error("passwords still don't match"));

	}else{
		console.log("Passwords match");
		this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
		this.pw_confirm = ""
		console.log(this.pw_confirm);
		next()
	}
})

mongoose.model('User', UserSchema)
