const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socket = require('socket.io');
const io = socket(server);

let users = [];

const messages = {
    general: [],
    random: [], 
    jokes: [],
    javascript: []
};

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

    socket.on("join room", (roomName, cb) => {
        //This will join the socket to the room that we pass in
        //cb is a callback function that we can call to send data back to the client
        socket.join(roomName);
        //cb allows us to send the messages that were in the room before the user joined
        cb(messages[roomName]);
    });

    socket.on("send message", ({content, to, sender, chatName, isChannel}) => {
        if (isChannel) {
            const payload = {
                content,
                chatName,
                sender,
            };
            io.to(to).emit("new message", payload);
        } else {
            const payload = {
                content,
                chatName: sender,
                sender
            };
            io.to(to).emit("new message", payload);
        }
        if (messages[chatName]) {
            messages[chatName].push({sender, content});
        }
    });

    socket.on("disconnect", () => {
        users = users.filter(u => u.id !== socket.id);
        io.emit("new user", users);
    });

});

server.listen(1337, () => console.log('Server is running on port 1337'));

