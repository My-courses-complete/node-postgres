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

	async sendRecovery(email) {
		const user = await service.findByEmail(email);
		if (!user) {
			throw boom.unauthorized();
		}
		const payload = {
			id: user.id
		}
		const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' });
		const link = `${config.host}/recovery/${token}`;
		await service.update(user.id, { recoveryToken: token });
		const infoMail = {
			from: config.email.host, // sender address
			to: `${user.email}`, // list of receivers
			subject: "Hello ✔", // Subject line
			text: "Hello world?", // plain text body
			html: `<b>Ingresa a este link => ${link}</b>`, // html body
		};
		const rta = await this.sendMail(infoMail);
		return rta;
	}

	async changePassword(token, password) {
		try {
			const payload = jwt.verify(token, config.jwtSecret);
			const user = await service.findOne(payload.id);
			if (!user || user.recoveryToken !== token) {
				throw boom.unauthorized();
			}
			const hash = await bcrypt.hash(password, 10);
			await service.update(user.id, { password: hash, recoveryToken: null });
			return "Se cambio la contraseña";
		} catch (error) {
			throw boom.unauthorized();
		}
	}

	async sendMail(infoMail) {
		let transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			secure: false, // true for 465, false for other ports
			port: 587,
			auth: {
				user: config.email.host,
				pass: config.email.password
			}
		});
		await transporter.sendMail(infoMail);
		return { message: 'mail sended' }
	}
}

module.exports = AuthService;
