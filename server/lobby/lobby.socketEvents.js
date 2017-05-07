var users = [];

const hookupLobbyEvents = (io) => {
  io.on('connection', function(socket) {
    socket.join('lobby');
    socket.on('new user', function(user) {
      users.push(user);
      socket.broadcast.to('lobby').emit('recv new users', users);
    });
    socket.on('remove user', function(removedUser) {
      users = users.filter((user) => {
        return removedUser._id !== user._id;
      });
      socket.broadcast.to('lobby').emit('recv new users', users);
    });
    socket.on('get users', function() {
      socket.emit('recv new users', users);
    });

    socket.on('challenge', ({challengee, challenger, resolution, sides}) => {
      io.to(challengee.socketid).emit('recv challenge',
        {challenger, resolution, sides});
    });
    socket.on('reject challenge', challenger => {
      io.to(challenger.socketid).emit('recv reject challenge');
    });
    socket.on('accept challenge', challenger => {
      io.to(challenger.socketid).emit('recv accept challenge');
    });

    socket.on('invite to channel', ({id, resolution, challengee}) => {
      io.to(challengee.socketid).emit('invite to channel',
                                        {id, resolution, challengee});
    });
  });
};

module.exports = {hookupLobbyEvents};
