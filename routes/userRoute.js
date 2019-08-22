const express = require('express');
const router = express.Router();
const { addAdmin } = require('../db');
const validate = require('../validate/validateNew');
const Admin = require('../models/adminModel');
const hash = require('../hash');
const authorize = require('../authorize');

const _ = require('lodash');

router.post('/', async (req, res, next) => {
	//validate input
	const error = validate(req.body);

	if (error) {
		console.log(error.details[0].message);
		res.status(400).send(error.details[0].message);
		return;
	}

	let admin = await Admin.findOne({ name: req.body.name });
	if (admin) return res.status(400).send("Le nom d'utilisateur existe déjà");

	const _user = await Admin.findOne({ email: req.body.email });
	if (_user) return res.status(400).send('Cet addresse email appartient à un autre utilisateur ');

	//save user into database
	try {
		const { name, email } = req.body;

		//hash password
		const password = await hash(req.body.password);

		//create new admin object
		admin = new Admin({
			name,
			email,
			password
		});

		//save user into database
		const adminSaved = await addAdmin(admin);

		if (typeof adminSaved.email !== 'undefined') {
			const response = _.pick(adminSaved, [ '_id', 'name', 'email' ]);
			const token = admin.generateToken();
			res.header('x-auth-token', token).status(200).send(response);
			console.log('Admin registered successfully', adminSaved);
		} else {
			res.status(500).send('Unable to register admin');
		}
	} catch (e) {
		console.log(e);
	}
});

router.get('/:id', authorize, async (req, res, next) => {
	try {
		const admin = await Admin.findById(req.params.id);
		if (!admin) return res.status(404).send('Admin not found');
		res.status(200).send(admin);
	} catch (e) {
		res.status(500).send('Unable to retrieve admin.Try again later');
		console.log('Unable to retrieve admin');
	}
});

module.exports = router;
