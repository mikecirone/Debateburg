
const hookupChannelEvents = (io) => {
  io.on('connection', function(socket) {
    socket.join('channels');
    socket.on('new item', function(msg) {
      io.to('channels').emit('recv new item', msg);
    });
  });
};

module.exports = {hookupChannelEvents};
