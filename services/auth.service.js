const boom = require('@hapi/boom')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('../config/config');
const UserService = require("./user.service");

const service = new UserService();

class AuthService {
	async getUser(email, password) {
		const user = await service.findByEmail(email);
		if (!user) {
			throw boom.unauthorized();
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw boom.unauthorized();
		}
		delete user.dataValues.password;
		return user;
	}
	signToken(user) {
		const payload = {
			id: user.id,
			role: user.role,
		}
		const token = jwt.sign(payload, config.jwtSecret)
		return {
			token
		};
	}
	async sendMail(email) {
		const user = await service.findByEmail(email)
		if (!user) {
			throw boom.unauthorized();
		}
		let transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			secure: false, // true for 465, false for other ports
			port: 587,
			auth: {
				user: config.email.host,
				pass: config.email.password
			}
		});
		await transporter.sendMail({
			from: config.email.host, // sender address
			to: `${user.email}`, // list of receivers
			subject: "Hello ✔", // Subject line
			text: "Hello world?", // plain text body
			html: "<b>Hello world?</b>", // html body
		});
		return { message: 'mail sended'}
	}
}

module.exports = AuthService;
