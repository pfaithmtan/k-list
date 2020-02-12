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
      res.status(500).send(`There has been an error: ${error}`);
    });
};

const findUserById = (req, res) => {
  const { id } = req.body;

  db.User.findOne({ where: { id } })
    .then((data) => {
      res.status(200).send(`Successfully found data: ${data}`);
    })
    .catch((error) => {
      res.status(500).send(`There has been an error: ${error}`);
    });
};

module.exports = {
  createUser,
  findUserById,
};
