const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const db = require('./config/keys').mongoURI;

const users = require('./routes/api/users');
const servers = require('./routes/api/servers');
const channels = require('./routes/api/channels');
const messages = require('./routes/api/messages');
const passport = require('passport');
require('./config/passport')(passport);

mongoose
  .connect(db)
  .then(() => console.log('connected to mongodb successfully'))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/users", users);
app.use("/api/servers", servers);
// servers.use("/:serverId/channels", channels);
app.use("/api/channels", channels);
app.use("/api/messages", messages);

app.use(passport.initialize());


const port = process.env.PORT || 5000;

const server = http.listen(port, () => console.log(`Server is running on port ${port}`));

// const io = require('socket.io').listen(server);

// io.on('connection', socket => {
//   socket.on('chat message', message => {
//     io.emit('chat message', message);
//   });
// });

io.on('connection', function(socket) {
  console.log('a user has connected');
  console.log(socket.id);
  socket.on('disconnect', function() {
    console.log('a user has disconnected');
  });
  socket.on('example_message', function(msg) {
    console.log('message: ' + msg);
  });
  socket.on('SEND_MESSAGE', function(data) {
    io.emit('RECEIVE_MESSAGE', data);
  });
  // socket.on('chat message', function(msg) {
  //   io.emit('chat message', msg);
  // });
});

// io.listen(server);