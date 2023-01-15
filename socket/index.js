const io = require('socket.io')(8080, {
    cors: {
        origin: "http://localhost:3000"
    }
})
console.log("socket started")
let user = []

io.on("connection", (socket) => {
    socket.on("addNewUser", (userId) => {

        if (!user.some((user) => user.userId === userId)) {
            user.push({
                userId: userId,
                socketId: socket.id
            })


        }

        io.emit("allUsers", user);
    })

    socket.on("disconnectUser", () => {
        user = user.filter((user) => user.socketId !== socket.id);
        io.emit("allUsers", user);
    })


    socket.on("sendMessage", (data) => {
       
        const { receiverId } = data;
        
        const receiver = user.find((value) => value.userId === receiverId);
       
        if (receiver) {
            io.to(receiver.socketId).emit("recieveMessage", data);
        }
    });
})