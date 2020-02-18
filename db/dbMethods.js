const db = require('./index');

const createUser = (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
  } = req.body;

  db.User.create({
    firstName,
    lastName,
    email,
    password,
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
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
      console.log(data);
      res.status(200).send(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
};

const getAllSongs = (req, res) => {
  db.Song.findAll({
    limit: 10,
  })
    .then((data) => {
      console.log(data);
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
      console.log(data);
      res.status(200).send(data);
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
};
