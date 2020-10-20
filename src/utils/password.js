const bcrypt = require('bcryptjs');

/*bcrypt.genSalt(10, (err, salt) => {
	bcrypt.hash('B4c0//', salt, (err, hash) => {
		console.log(hash);
	});
});*/

const check = async (password, hash) => {
	const comparison = await bcrypt.compare(password,hash);
	return comparison
};

const encrypt = async (password) => {
	const hash = await bcrypt.hash(password, 10);
//	console.log(hash);
	return hash;
};

encrypt('vouserdev');
module.exports = { check, encrypt };
