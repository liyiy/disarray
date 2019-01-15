const mongoose = require('mongoose');
const express = require('express');
const app = express();
const db = require('./config/keys').mongoURI;

mongoose
  .connect(db)
  .then(() => console.log('connected to mongodb successfully'))
  .catch(err => console.log(err));


app.get('/', (req, res) => res.send("Helsdfd!"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));