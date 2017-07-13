const mongoose = require('mongoose');
const User = mongoose.model('User');
const session = require('express-session');
const bcrypt = require('bcrypt');

module.exports = {
	index: (req, res) =>{
		console.log(req.session.name)
		if(req.session.name){
			res.redirect('/success')
		}else{
			res.render('index');
		}
	},

	register: (req, res) => {
		let user = new User(req.body);
		user.save( (err, savedUser) => {
			let errors = [];
			if(err){
				for (let i in err.errors){
					errors.push(err.errors[i].message);
				}
				if (errors.length < 1){
					errors.push("Passwords don't match!")
				}
				res.json(errors);
			}
			else{
				res.session.name = savedUser.first_name;
				res.redirect('/success');
			}
		})
	},

	login: (req, res) => {
		let query = User.findOne({email: req.body.email}, function(err, user){
			if(err){
				console.log("errors: ", err);
			}
			if(user){
				if(bcrypt.compareSync(req.body.password, user.password)){
					console.log("Passwords match!")
					req.session.name = user.first_name
					res.redirect('/success')
				}
				else{
					let errors = {error: "Invalid Username or Password"};
					res.json(errors)
				}
			}
			else{
				let errors = {error: "Invalid Username or Password"};
				res.json(errors)
			}
		})
	},

	success: (req, res) => {
		if(req.session.name){
			res.render('success')
		}else{
			res.redirect('/')
		}

	},

	logout: (req, res) => {
		req.session.destroy()
		res.redirect('/')
	}

};
