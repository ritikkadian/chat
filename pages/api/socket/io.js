import { Server } from "socket.io";

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer = res.socket.server;
    const io = new Server(httpServer, {
      path: path,
      addTrailingSlash: false,
    });
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("user connected");
      socket.on("message", (message) => {
        console.log("message received at server end ", message);
        io.emit("message", message);
      });
      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });
  }

  res.end();
};

export default ioHandler;
