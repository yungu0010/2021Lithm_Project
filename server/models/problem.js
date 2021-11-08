const Sequelize = require('sequelize');

module.exports = class Problem extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
        problem_id: {
          type:Sequelize.INTEGER,
          allowNull:false
        },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Problem',
      tableName: 'problems',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }
  static associate(db) {
    db.Problem.belongsTo(db.User);
  }
};