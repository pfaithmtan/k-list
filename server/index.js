const path = require('path');
const express = require('express');
const morgan = require('morgan');
const controller = require('../db/dbMethods');

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.post('/api/users', controller.createUser);

app.listen(port, () => console.log(`App server listening on port: ${port}!`));
