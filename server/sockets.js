//stanged to connect to users hardware, not yet functional

module.exports = function(io, email) {

  io.on('connection', (socket) => {
    socket.on('connect', () => {
      io.emit('new user connection', email)
    })
    socket.on('new data', (data) => {
      io.emit('client side data', data)
    })
  })
}
