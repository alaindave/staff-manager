const mongoose = require('mongoose');
const Admin = require('./models/adminModel');
const Staff = require('./models/staffModel');
const DaysOff = require('./models/daysOffModel');

mongoose
	.connect(process.env.MONGODB_URI || 'mongodb://localhost/staffmanagerdb', { useNewUrlParser: true })
	.then(() => console.log('Connected to MongoDb...'))
	.catch((err) => console.error('Could not connect to MongoDB', err));

const addAdmin = async (_admin) => {
	const admin = new Admin({
		name: _admin.name,
		email: _admin.email,
		password: _admin.password
	});

	try {
		const result = await admin.save();
		return result;
	} catch (e) {
		console.log('unable to register admin');
		return e.message;
	}
};

const addStaff = async (_staff) => {
	const staff = new Staff({
		matricule: _staff.matricule,
		department: _staff.department,
		lastName: _staff.lastName,
		firstName: _staff.firstName,
		telephone: _staff.telephone,
		address: _staff.address,
		daysOff: _staff.daysOff
	});

	try {
		const result = await staff.save();
		return result;
	} catch (e) {
		console.log('unable to add staff');
		return e.message;
	}
};

const addPic = async (url, id) => {
	try {
		// Fetch user with the given id
		const staff = await Staff.findById(id);

		//add url to staff document
		staff.imageUrl = url;

		staff.save();
		console.log('updated staff', staff);
	} catch (e) {
		console.log('Unable to add image.Error message:', e.message);
	}
};

const getStaff = async () => {
	try {
		const staff = await Staff.find().sort({ lastName: 1 }).populate('approvedBreaks');
		return staff;
	} catch (e) {
		console.log('unable to fetch staff');
		return e.message;
	}
};

const getNumberOfStaff = async () => {
	try {
		const staff = await Staff.count();
		return staff;
	} catch (e) {
		console.log('unable to fetch number of staff');
		return e.message;
	}
};
const saveLetter = async (letter) => {
	const daysOff = new DaysOff({
		letter
	});
	try {
		const result = await daysOff.save();
		return result;
	} catch (e) {
		console.log('unable to save letter ');
		return e.message;
	}
};

const addDaysOff = async (id, startDate, endDate, numberDays) => {
	try {
		const result = await DaysOff.findById(id);
		result.startDate = startDate;
		result.endDate = endDate;
		result.numberDays = numberDays;
		result.save();

		return result;
	} catch (e) {
		console.log('unable to save days off request');
		return e.message;
	}
};

module.exports = {
	addAdmin,
	addStaff,
	addPic,
	getStaff,
	getNumberOfStaff,
	saveLetter,
	addDaysOff
};
