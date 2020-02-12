const { Sequelize, DataTypes, Model } = require('sequelize');

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

class User extends Model { }

User.init({
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

sequelize.sync();

// User.sync({ force: true }).then(() => (
//   // Now the `users` table in the database corresponds to the model definition
//   User.create({
//     firstName: 'John',
//     lastName: 'Hancock',
//     email: 'hi@hello.com',
//     password: 'starwars',
//   })
// ));
