//stanged to connect to users hardware, not yet functional

module.exports = function(io, email) {

  console.log('server in sockets: ', io);

  io.on('connection', (socket) => {
    console.log('inside connection on server')
    socket.on('connect', () => {
      io.emit('new user connection', email)
    })
    socket.on('new data', (data) => {
      console.log('data from client-server: ', data);
      io.emit('client side data', data)
    })
  })
}
