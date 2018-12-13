
module.exports = (io) => {
    console.log('1.SERVIDOR')
  
    io.on('connection', (socket) => {
      console.log(`A user connected with id: ${socket.id}`);
      socket.on('message', (data) => {
       //recibo los mensajes y lo mando de nuevo al cliente
       //data a la bbdd
       //cojo todos los mensajes del chat
       //los devuelvo al cliente
        socket.broadcast.emit('message', data);
      });
    });
  };