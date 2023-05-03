import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

// import { getUsers, createUsers } from "./db/users/requests.js";
// import { posts, createPosts } from "./db/posts/requests.js";
import { posts, createPosts, getPosts } from "./db/posts/requests.js";

// console.log(JSON.stringify(posts, null, 2));

const app = express();

app.use(express.json());

let corsOption = {
  //   pingTimeout: 60000,
  cors: {
    // methods: ["GET", "POST"],
    // origin: "*",
    origin: "http://localhost:3000",
  },
};

app.use(cors(corsOption));

const server = createServer(app);
const socketIO = new Server(server, corsOption, { pingInterval: 1000 });

const users = [];
// const messages = [];

app.get("/posts", async (req, res) => {
  const notes = await getPosts();
  res.send(notes);
});

app.post("/posts", async (req, res) => {
  const data = req.body;
  const note = await createPosts(data.name, data.text, data.author_id, data.socketID);
  res.status(201).send(note);
});

socketIO.on("connection", (socket) => {
  console.log(`${socket.id} user connected`);

  socket.on("message", (data) => {
    // const res = JSON.parse(data);
    // console.log("message ", res);
    // console.log("Message", data);

    // socketIO.emit("response", JSON.stringify(posts, null, 2));

    // console.log("createPosts " + createPosts(data.name, data.text, data.author_id, data.socketID));
    // if (data) {
    //   .then((messages) => {
    //     // console.log(JSON.stringify(messages, null, 2));
    //     return JSON.stringify(messages, null, 2);
    //   });
    // }
    // async () => await createPosts(data.name, data.text, data.author_id, data.socketID);
    // createPosts(data.name, data.text, data.author_id, data.socketID);

    // messages.push[data];
    // JSON.stringify(posts, null, 2);
    socketIO.emit("response", data);
  });

  socket.on("typing", (data) => socket.broadcast.emit("responseTyping", data));

  socket.on("newUser", (data) => {
    users.push(data);
    socketIO.emit("responseNewUser", users);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} user disconnect`);
  });
});

const port = 8080;
server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
