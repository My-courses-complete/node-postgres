const jwt = require('jsonwebtoken');

const secret = 'secret';
const payload = {
	name: 'John Doe',
	admin: true
};

function signToken(payload, secret) {
	return jwt.sign(payload, secret);
}

const token = signToken(payload, secret);

console.log(token);