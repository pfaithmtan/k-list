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

module.exports = {
  createUser,
};
