const path = require('path');
const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 3000;

app.use(morgan);
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

app.listen(port, () => console.log(`App server listening on port: ${port}!`));
