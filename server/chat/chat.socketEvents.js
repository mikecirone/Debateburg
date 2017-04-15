
const hookupChatEvents = (io) => {
  io.on('connection', function(socket) {
    socket.on('leave channel', function(channelID) {
      socket.leave(channelID)
    })
    socket.on('join channel', function(channelID) {
      socket.join(channelID)
    })
    socket.on('new item', function(msg) {
      io.to(msg.channelID).emit('recv new item', msg);
    });
  });
};

module.exports = {hookupChatEvents};
