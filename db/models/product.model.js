const { DataTypes, Sequelize, Model } = require("sequelize");
const { CATEGORY_TABLE } = require("./category.model");

const PRODUCT_TABLE = 'products';

const productSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	image: {
		type: DataTypes.STRING,
		allowNull: true
	},
	description: {
		type: DataTypes.STRING,
		allowNull: true
	},
	price: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	createdAt: {
		allowNull: false,
		type: DataTypes.DATE,
		field: 'created_at',
		defaultValue: Sequelize.NOW
	},
	categoryId: {
		field: 'category_id',
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: CATEGORY_TABLE,
			key: 'id'
		},
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL'
	}
}

class Product extends Model {
	static associate(models) {
		this.belongsTo(models.Category, {as: 'category'});
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: PRODUCT_TABLE,
			modelName: 'Product',
			timestamps: false,
		}
	}
}

module.exports = { PRODUCT_TABLE, productSchema, Product };