const bcrypt = require('bcrypt');

async function hashPassword() {
	const myPassword = 'myPassword';
	const hash = '$2b$10$omfu.QbDZMx40TutGlvgQu0FuqXNjO9aXohptdoY.VecbnOl/x.mO';
	const isMatch = await bcrypt.compare(myPassword, hash);

	console.log(isMatch);
}

hashPassword();