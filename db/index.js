const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('database', '', '', {
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

const User = sequelize.define('user', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'user',
});

const Song = sequelize.define('song', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  artist: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'user',
});

sequelize.sync();

module.exports = {
  User,
  Song,
};
