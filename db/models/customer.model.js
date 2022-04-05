const { DataTypes, Sequelize, Model } = require("sequelize");
const { USER_TABLE } = require("./user.model");

const CUSTOMER_TABLE = 'customers';

const CustomerSchema = {
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
	lastName: {
		type: DataTypes.STRING,
		allowNull: false,
		field: 'last_name'
	},
	phone: {
		type: DataTypes.STRING,
		allowNull: true
	},
	createdAt: {
		allowNull: false,
		type: DataTypes.DATE,
		field: 'created_at',
		defaultValue: Sequelize.NOW
	},
	userId: {
		field: 'user_id',
		allowNull: false,
		type: DataTypes.INTEGER,
		unique: true,
		references: {
			model: USER_TABLE,
			key: 'id'
		},
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL'
	}
}

class Customer extends Model {
	static associate(models) {
		this.belongsTo(models.User, {as: 'user'});
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: CUSTOMER_TABLE,
			modelName: 'Customer',
			timestamps: false,
		}
	}
}

module.exports = { CUSTOMER_TABLE, CustomerSchema, Customer };