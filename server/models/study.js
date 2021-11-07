const Sequelize = require('sequelize');

module.exports = class Study extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
        study_title: {
            type: Sequelize.STRING(30),
            allowNull: false,
            unique:true 
        },
        study_master: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        study_solve: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        study_day: {
            type: Sequelize.STRING(30),
            allowNull: false,
        },
        study_penalty: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Study',
      tableName: 'studies',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }
  static associate(db) {     
    db.Study.hasMany(db.User); 
  }
};