const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('../libs/sequelize')

class CustomerService {
	constructor() { }

	async create(data) {
		try {
			data.user.password = await bcrypt.hash(data.user.password, 10);
			const newCustomer = await models.Customer.create(data, {
				include: ['user']
			});
			delete newCustomer.dataValues.user.dataValues.password; 
			return newCustomer;
		} catch (error) {
			if (error.name === 'SequelizeUniqueConstraintError') {
				throw boom.conflict(error.errors[0].message);
			}
			throw boom.badRequest(error);
		}
	}

	async find() {
		const rta = await models.Customer.findAll({
			include: ['user']
		});
		return rta;
	}

	async findOne(id) {
		const customer = await models.Customer.findByPk(id);
		if (!customer) {
			throw boom.notFound('customer not found');
		}
		return customer;
	}

	async update(id, changes) {
		const customer = await this.findOne(id);
		const rta = customer.update(changes);
		return rta;
	}

	async delete(id) {
		const customer = await this.findOne(id);
		await customer.destroy();
		return { id };
	}
}

module.exports = CustomerService;