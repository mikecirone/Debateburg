
const hookupChatEvents = (io) => {
  io.on('connection', function(socket) {
    socket.join('debatehall1');
    socket.on('leave channel', function(channel) {
      socket.leave(channel)
    })
    socket.on('join channel', function(channel) {
      socket.join(channel.name)
    })
    socket.on('new item', function(msg) {
      io.to(msg.channelID).emit('recv new item', msg);
    });
  });
};

const hookupChannelEvents = (io) => {
  io.on('connection', function(socket) {
    socket.join('channels');
    socket.on('new item', function(msg) {
      io.to('channels').emit('recv new item', msg);
    });
  });
};

module.exports = {hookupChatEvents, hookupChannelEvents};
