var users = [];

const hookupLobbyEvents = (io) => {
  io.on('connection', function(socket) {
    socket.join('lobby');
    socket.on('new user', function(usr) {
      users.push(usr);
      console.log(users);
      socket.broadcast.to('lobby').emit('recv new user', usr);
    });
  });
};

module.exports = {hookupLobbyEvents};
