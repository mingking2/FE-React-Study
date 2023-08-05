const Sequelize = require('sequelize');
const Todo = require('./Todo');

require('dotenv').config();
const config = JSON.parse(process.env.DATABASE_ACCOUNT);
const db = {};

const sequelize = new Sequelize(config.database, config.user, config.password, config);

db.sequelize = sequelize;

db.Todo = Todo;

Todo.init(sequelize);

module.exports = db;