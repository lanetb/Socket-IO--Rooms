const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socket = require('socket.io');
const io = socket(server);

let users = [];

//connection event listens for a new socket connection and will generate a socket object which represents the newly joined person.
io.on('connection', socket => {
    //socket listener that we can recieve information from the client on
    socket.on("join server", (username) => {
        //In this case, we are going to emit a message to all the clients that a new user has joined the server and add the user 
        //to the users array
        const user = {
            username,
            id: socket.id,
        };
        users.push(user);
        io.emit("user joined", users);
    });
});

server.listen(1337, () => console.log('Server is running on port 1337'));

