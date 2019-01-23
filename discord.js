const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const db = require('./config/keys').mongoURI;
const users = require('./routes/api/users');
const events = require('./routes/api/events');
const passport = require('passport');
require('./config/passport')(passport);

mongoose
  .connect(db)
  .then(() => console.log('connected to mongodb successfully'))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/users", users);
app.use("/api/events", events);
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));