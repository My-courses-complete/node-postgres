const jwt = require('jsonwebtoken');

const secret = 'secret';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjU0NjY4NTgyfQ.dZyAB52HVbFJ_cZAnp-kjm9GUkrPOquXFq7n2VOYU1o'

function verifyToken(token) {
	return jwt.verify(token, secret);
}

const payload = verifyToken(token);
console.log(payload);

