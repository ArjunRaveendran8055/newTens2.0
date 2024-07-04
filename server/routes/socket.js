const { Server } = require("socket.io");
const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Connection established");
    
    socket.on("disconnect", () => {
      console.log("Disconnected");
    });
  });

  return io;
};

module.exports = setupSocket;