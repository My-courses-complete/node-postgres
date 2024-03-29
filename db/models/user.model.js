const { Model, DataTypes, Sequelize} = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	},
	recoveryToken: {
		type: DataTypes.STRING,
		allowNull: true,
		field: 'recovery_token'
	},
	role: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'customer',
	},
	createdAt: {
		allowNull: false,
		type: DataTypes.DATE,
		field: 'created_at',
		defaultValue: Sequelize.NOW
	},
}

class User extends Model {
	static associate(models) {
		this.hasOne(models.Customer, {
			as: 'customer',
			foreignKey: 'user_id',
		});
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: USER_TABLE,
			modelName: 'User',
			timestamps: false,
		}
	}
}

module.exports = { USER_TABLE, UserSchema, User };