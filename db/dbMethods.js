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
      res.status(200).send(`Successfully saved ${data} in db!`);
    })
    .catch((error) => {
      res.status(500).send(`Error saving user to db: ${error}`);
    });
};

const findUserById = (req, res) => {
  const { id } = req.body;

  db.User.findOne({ where: { id } })
    .then((data) => {
      res.status(200).send(`Successfully found data: ${data}`);
    })
    .catch((error) => {
      res.status(500).send(`Error finding user by id: ${error}`);
    });
};

const verifyUser = (req, res) => {
  const { email } = req.body;

  db.User.findOne({ where: { email } })
    .then((data) => {
      res.status(200).send(`User confirmed via email: ${data}`);
    })
    .catch((error) => {
      res.status(500).send(`Error verifying user: ${error}`);
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
      res.status(500).send(`Error adding song: ${error}`);
    });
};

const getSongs = (req, res) => {
  db.Song.findAll()
    .then((data) => {
      res.status(200).send(`Here's the list of songs: ${data}`);
    })
    .catch((error) => {
      res.status(500).send(`Error fetching songs: ${error}`);
    });
};

module.exports = {
  createUser,
  findUserById,
  verifyUser,
  addSongs,
  getSongs,
};
