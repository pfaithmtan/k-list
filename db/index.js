const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'root', '', {
  host: 'localhost',
  dialect: 'postgres',
});

try {
  (async () => {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  })();
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
