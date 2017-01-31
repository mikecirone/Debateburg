exports = module.exports = function(io) {
  io.on('connection', function(socket) {
    socket.join('debatehall1');
    socket.on('leave channel', function(channel) {
      socket.leave(channel)
    })
    socket.on('join channel', function(channel) {
      socket.join(channel.name)
    })
    socket.on('new chat item', function(msg) {
      io.to(msg.channelID).emit('recv new chat item', msg);
    });
    socket.on('new channel item', function(msg) {
      io.to(msg.channelID).emit('recv new channel item', msg);
    });
  });
}
