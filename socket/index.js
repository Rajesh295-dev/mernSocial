

const io = require("socket.io")(3309, {
    cors: {
        origin: "http://localhost:3000",

    },
});

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
}

const getUser = (userId) => {
    return users.find((user) => user.userId === userId)
};

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)

}

io.on("connection", (socket) => {
    //when connected
    console.log("a user connected.")
    //get the user id and socket id
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id)
        io.emit("getUsers", users)

    })

    //send and receive the messages
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        if (user && user.socketId) {
            io.to(user.socketId).emit("getMessage", {
                senderId,
                text,
            });
        } else {
            console.log(`User with ID ${receiverId} not found or not connected.`);
        }
        // io.to(user.socketId).emit("getMessage", {
        //     senderId,
        //     text,
        // });
    });


    //when disconnected
    socket.on("disconnected", () => {
        console.log("a user disconnected")
        removeUser(socket.id)
        io.emit("getUsers", users)
    })
})
