const express = require('express');
const { createCustomerSchema, getCustomerSchema, updateCustomerSchema } = require('../schemas/customer.schema');

const CustomerService = require('../services/customer.service');
const validationHandler = require('../middlewares/validator.handler');

const router = express.Router();
const service = new CustomerService();

router.get('/', async (req, res, next) => {
	try {
		res.json(await service.find());
	} catch (error) {
		next(error);
	}
});

router.post('/', validationHandler(createCustomerSchema), async (req, res, next) => {
	const { body: customer } = req;
	try {
		res.json(await service.create(customer));
	} catch (error) {
		next(error);
	}
});

router.get('/:id', validationHandler(getCustomerSchema), async (req, res, next) => {
	const { params: { id } } = req;
	try {
		res.json(await service.findOne(id));
	} catch (error) {
		next(error);
	}
});

router.patch('/:id', validationHandler(updateCustomerSchema), validationHandler(getCustomerSchema), async (req, res, next) => {
	const { params: { id }, body: changes } = req;
	try {
		res.json(await service.update(id, changes));
	} catch (error) {
		next(error);
	}
});

router.delete('/:id', validationHandler(getCustomerSchema), async (req, res, next) => {
	const { params: { id } } = req;
	try {
		res.json(await service.delete(id));
	} catch (error) {
		next(error);
	}
});

module.exports = router;