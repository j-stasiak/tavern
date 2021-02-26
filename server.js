const server = require("http").createServer();
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});

const PORT = 4000;

io.on("connection", (socket) => {
    console.log('connected!!!')

    socket.emit("your id", socket.id);

    socket.on('message', data => {
        console.log('message')
        io.emit('message:client', data);

    });
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
