const express = require("express");
const app = express();
require("dotenv").config();
const router = require("./routes/route");
const cors = require("cors");
const port = process.env.PORT || 3000;

// Socket Settings
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000/",
  },
});

io.on("connection", (socket) => {
    // io.emit("new-connect")
    // console.log(socket.id, "Socket ID");

    socket.on("set-user", (username) => {
        socket.user = {
            username
        }
    })

    // terima pesan dari client
    socket.on("send-message", (payload) => {
        // pesan yang diterima di-publish ke seluruh client
        io.emit("new-message", payload)
    })
});

// Body Parser and CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routing
app.use(router);

app.get("/", (req, res) => {
  res.send("Hello, welcome to our server!");
});

httpServer.listen(port, () => {
  console.clear();
  console.log(`Server is running on port ${port}`);
});

// module.exports = app;
