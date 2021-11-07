const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
        user_email: {
          type: Sequelize.STRING(30),
          allowNull:false,
          unique:true,
        },
        user_pw: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        bj_id: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        user_nick: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        user_color: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
        user_penalty: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue:0
        },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }
  static associate(db) {
    db.User.belongsTo(db.Study);
    db.User.hasMany(db.Problem);
  }
};