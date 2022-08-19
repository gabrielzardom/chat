const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;


/* 
Añadimos una forma de obtener el index.html
*/
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


/* 
Escucha cuando alguien se conecta o desconecta.
*/
io.on('connection', (socket) => {
console.log('Usuario conectado, ID: ', socket.id);
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    console.log('Usuario desconectado, ID: ', socket.id);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
