const { Model, DataTypes, Sequelize } = require("sequelize");

const { CUSTOMER_TABLE } = require("./customer.model");

const ORDER_TABLE = 'orders';

const OrderSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER
	},
	customerId: {
		field: 'customer_id',
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: CUSTOMER_TABLE,
			key: 'id'
		},
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL'
	},
	createdAt: {
		allowNull: false,
		type: DataTypes.DATE,
		field: 'created_at',
		defaultValue: Sequelize.NOW
	},
	total: {
		type: DataTypes.VIRTUAL,
		get() {
			if(this.items.length > 0) {
				return this.items.reduce((acc, item) => acc + (item.price * item.OrderProduct.amount), 0);
			}
		}
	}
}

class Order extends Model {
	static associate(models) {
		this.belongsTo(models.Customer, { as: 'customer' });
		this.belongsToMany(models.Product, { through: models.OrderProduct, as: 'items', foreignKey: 'orderId', otherKey: 'productId' });
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: ORDER_TABLE,
			modelName: 'Order',
			timestamps: false,
		}
	}
}

module.exports = { ORDER_TABLE, OrderSchema, Order };
