const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const socket = require("socket.io");

// start the server
const server = app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

//Middleware
// serving files from public
app.use(express.static("public"));

// Setup the socket
const io = socket(server);
io.on("connection", socket => {
  console.log("connected with id: ", socket.id);

  // Handle chat event
  socket.on("chat", data => {
    io.sockets.emit("chat", data);
  });

  // Handle typing event
  socket.on("typing", data => {
    socket.broadcast.emit("typing", data);
  });
});
