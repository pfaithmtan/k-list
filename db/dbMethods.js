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
      res.status(200).send(`Saved ${data} in db!`);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

const findUserByEmail = (email) => db.User.findOne({ where: { email } });

const findUserById = (req, res) => {
  const { id } = req.body;

  db.User.findOne({ where: { id } })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

const verifyUser = (req, res) => {
  const { email } = req.body;

  db.User.findOne({ where: { email } })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

const addSongs = (req, res) => {
  const { title, artist } = req.body;

  db.Song.create({
    title,
    artist,
  })
    .then((data) => {
      res.status(200).send(`Added ${data} to list!`);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

const getSongs = (req, res) => {
  db.Song.findAll({ raw: true })
    .then((data) => {
      console.log(data);
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

module.exports = {
  createUser,
  findUserById,
  verifyUser,
  addSongs,
  getSongs,
  findUserByEmail,
};
