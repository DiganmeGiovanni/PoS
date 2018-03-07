const Sequelize = require('sequelize');

const sequelize = new Sequelize('post_db', 'root', 'root', {
  host: 'localhost',
  dialect: 'sqlite',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },

  storage: `${__dirname}database.sqlite`,
  define: {
    freezeTableName: true,
    timestamps: false,
  },
});

export default sequelize;
