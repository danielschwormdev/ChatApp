const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./user.js');

// Port wird auf localhost:5000 gesetzt
const PORT = 5000

// router wird hier required
const router = require('./router');

const app = express();
const server = http.createServer(app);

// socket.io Instanziierung
const io = socketio(server);

// Registriert das Einloggen und Verlassen eines Client mit einer Callback Funktion
// Hört auf jede Verbindung
io.on('connection', (socket) => {
    socket.on('join', ({ name, room }, callback) => {               // passende callback function zu Chat.js, welche Daten von socket.emit aufruft
        const { error, user } = addUser({ id: socket.id, name, room });

        if(error) return callback(error);

        socket.emit('message', { user: 'admin', text: `${user.name}, Willkommen im Raum ${user.room}` });
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, hat sich eingeloggt!` });

        socket.join(user.room);

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });

        callback();
    })

    socket.on('disconnect', () => {
        console.log('User hat sich ausgeloggt!!!!');
    })
});

// router wird hier verwendet
app.use(router);

// Server lauscht auf PORT der oben definiert ist
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));