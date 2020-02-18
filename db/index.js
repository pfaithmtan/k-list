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
    unique: true,
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
  modelName: 'song',
  timestamps: false,
});

const UserSong = sequelize.define('user_song', {
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  song_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'songs',
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'user_song',
  timestamps: false,
});

Song.hasMany(UserSong, { foreignKey: 'song_id' });
UserSong.belongsTo(Song, { foreignKey: 'song_id' });

sequelize.sync();

module.exports = {
  User,
  Song,
  UserSong,
};
