
module.exports = (io) => {
    console.log('1.SERVIDOR')
  
    io.on('connection', (socket) => {
      console.log(`A user connected with id: ${socket.id}`);
      socket.on('message', (data) => {
        console.log(data)
       //recibo los mensajes y lo mando de nuevo al cliente
       //data a la bbdd
       //cojo todos los mensajes del chat
       //los devuelvo al cliente

       //emito a mi id
       //emvio los chat del id chat que he recibdo
        socket.broadcast.emit(data.chat_id, data);
      });
    });
  };