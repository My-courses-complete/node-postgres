const { Category, CategorySchema } = require("./category.model");
const { Customer, CustomerSchema } = require("./customer.model");
const { Product, productSchema } = require("./product.model");
const { User, UserSchema } = require("./user.model");

function setupModels(sequelize) {
	User.init(UserSchema, User.config(sequelize));
	Customer.init(CustomerSchema, Customer.config(sequelize));
	Category.init(CategorySchema, Category.config(sequelize));
	Product.init(productSchema, Product.config(sequelize));

	User.associate(sequelize.models);
	Customer.associate(sequelize.models);
	Category.associate(sequelize.models);
	Product.associate(sequelize.models);
}

module.exports = setupModels;