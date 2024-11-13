import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

interface State {
  currentLyric: string | null;
}

let state: State = {
  currentLyric: null,
};

io.on("connection", (socket: Socket) => {
  socket.on("setLyricAction", (data: State) => {
    state = data;
    io.emit("setLyric", state);
  });

  socket.on("swipeLeftAction", () => {
    io.emit("swipeLeft");
  });

  socket.on("swipeRightAction", () => {
    io.emit("swipeRight");
  });

  socket.on("stopAction", () => {
    state.currentLyric = null;
    io.emit("stop");
  });

  socket.on("getCurrentStateAction", () => {
    io.emit("currentState", state);
  });

  socket.on("refreshDisplayAction", () => {
    console.log("Refreshing display...");
    io.emit("refreshDisplay");
  });
});

httpServer.listen(3000, () => {
  console.log("Listening at :3000...");
});
