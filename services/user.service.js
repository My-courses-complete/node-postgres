const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('../libs/sequelize');

class UserService {
  constructor() {}

  async create(data) {
    try {
      data.password = await bcrypt.hash(data.password, 10);
      const newUser = await models.User.create(data);
      delete newUser.dataValues.password;
      return newUser;
    } catch (error) {
      if(error.original.code === '23505') {
        if (error.original.detail.includes('email')) {
          throw boom.conflict('Email already exists');
        }
        throw boom.badRequest(error);
      }
      throw boom.badRequest(error);
    }
  }

  async find() {
    const rta = await models.User.findAll({
      include: ['customer']
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
