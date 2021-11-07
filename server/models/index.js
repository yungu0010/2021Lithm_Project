const Sequelize = require('sequelize');
const User = require('./user');
const Problem = require('./problem');
const Study = require('./study');
const env =  'development';
const config = require('../config/config')[env];

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
db.Study = Study;
db.Problem = Problem;

User.init(sequelize);
Study.init(sequelize);
Problem.init(sequelize);

User.associate(db);
Study.associate(db);
Problem.associate(db);

module.exports = db;