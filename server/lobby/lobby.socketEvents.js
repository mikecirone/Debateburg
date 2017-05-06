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
  });
};

module.exports = {hookupLobbyEvents};
