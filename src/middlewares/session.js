/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verify = async (ctx, next) => {
	const [bearer, token] = ctx.headers.authorization.split(' ');
// 	console.log(bearer);
	const verification = await jwt.verify(token, process.env.JWT_SECRET);
//	console.log(verification);

	ctx.state.email = verification.email;
	return next();
};

module.exports = { verify };
