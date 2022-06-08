const boom = require('@hapi/boom')
const { config } = require('../config/config')

function checkApiKey(req, res, next) {
	const apiKey = req.headers['api']
	console.log(apiKey)
	if (apiKey === config.apiKey) {
		next()
	} else {
		next(boom.unauthorized())
	}
}

function cheackAdminRole(req, res, next) {
	const role = req.user.role
	if (role === 'admin') {
		next()
	} else {
		next(boom.unauthorized())
	}
}

function checkRoles(...roles) {
	return (req, res, next) => {
		const userRole = req.user.role
		if (roles.includes(userRole)) {
			next()
		} else {
			next(boom.unauthorized())
		}
	}
}

module.exports = { checkApiKey, cheackAdminRole, checkRoles }