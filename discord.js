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

if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  // app.use(express.static('frontend/public'));
  app.use(express.static(path.join(__dirname, 'frontend/public')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'public', 'index.html'));
  });
  // Express serve up index.html file if it doesn't recognize route
}

const port = process.env.PORT || 5000;

const server = http.listen(port, () => console.log(`Server is running on port ${port}`));

io.on('connection', function(socket) {
  console.log('a user has connected');
  socket.on('disconnect', function() {
    console.log('a user has disconnected');
  });
  let room;

  socket.on("JOIN_CHANNEL", data => {
    console.log(`joined channel ${data.channelId}`);
    room = data.channelId;
    socket.join(room);
  });

  socket.on("LEAVE_CHANNEL", data => {
    room = data.channelId;
    socket.leave(room);
    console.log(`left channel ${data.channelId}`);
  });

  
  socket.on('SEND_MESSAGE', function(data) {
    io.to(room).emit('RECEIVE_MESSAGE', data);
  });
});

