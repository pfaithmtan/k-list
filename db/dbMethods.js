const bcrypt = require('bcrypt');
const db = require('./index');

const saltRounds = 10;

const createUser = (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, saltRounds).then((hash) => {
    db.User.create({
      firstName,
      lastName,
      email,
      password: hash,
    })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  });
};

const findUserByEmail = (email) => db.User.findOne({ where: { email } });

const addSongs = (req, res) => {
  const { title, artist } = req.body;

  db.Song.create({
    title,
    artist,
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

const getUserSongs = (req, res) => {
  const { id } = req.user.dataValues;

  // const query = await sequelize.query(
  //   `SELECT * FROM songs
  //   INNER JOIN user_songs
  //   ON songs.id = user_songs.song_id
  //   WHERE user_songs.user_id = songs.id`
  //   );

  db.Song.findAll({
    include: [{
      model: db.UserSong,
      where: { user_id: id },
      required: true,
    }],
    order: [[{
      model: db.UserSong,
    }, 'id', 'ASC']],
  })
    .then((data) => {
      // console.log(data);
      res.status(200).send(data);
    })
    .catch((error) => {
      // console.log(error);
      res.status(500).send(error);
    });
};

const getAllSongs = (req, res) => {
  db.Song.findAll({
    limit: 10,
  })
    .then((data) => {
      // console.log(data);
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

const addUserSongs = (req, res) => {
  const user_id = req.user.dataValues.id;
  const { song_id } = req.body;

  db.UserSong.create({
    user_id,
    song_id,
  })
    .then((data) => {
      // console.log(data);
      res.status(200).send(data);
    })
    .catch((error) => {
      // console.log(error);
      res.status(500).send(error);
    });
};

const searchSong = (req, res) => {
  db.Song.findAll({
    where: {
      [db.Sequelize.Op.or]: [
        {
          title: {
            [db.Sequelize.Op.iLike]: `%${req.query.query}%`,
          },
        },
        {
          artist: {
            [db.Sequelize.Op.iLike]: `%${req.query.query}%`,
          },
        },
      ],
    },
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

const deleteSong = (req, res) => {
  // console.log('req:', req.query);
  // console.log('req.user_id:', req.user.dataValues.id);
  const user_id = req.user.dataValues.id;
  let { song_id } = req.query;

  db.UserSong.destroy({
    where: {
      user_id,
      song_id,
    },
  })
    .then((data) => {
      console.log(data);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
};

module.exports = {
  createUser,
  findUserByEmail,
  addSongs,
  getUserSongs,
  getAllSongs,
  addUserSongs,
  searchSong,
  deleteSong,
};
