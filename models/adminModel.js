const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true }
});

userSchema.methods.generateToken = function() {
	return jwt.sign({ name: this.name, email: this.email }, process.env.jwtKey);
};

const Admin = mongoose.model('Users', userSchema);

module.exports = Admin;
