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

const logState = (action: string, emitted: string) => {
  console.log(`${new Date().toLocaleString()} - ${action} - ${emitted}`);
};

io.on("connection", (socket: Socket) => {
  socket.on("setLyricAction", (data: State) => {
    state = data;
    io.emit("setLyric", state);
    logState("setLyricAction", "setLyric");
  });

  socket.on("swipeLeftAction", () => {
    io.emit("swipeLeft");
    logState("swipeLeftAction", "swipeLeft");
  });

  socket.on("swipeRightAction", () => {
    io.emit("swipeRight");
    logState("swipeRightAction", "swipeRight");
  });

  socket.on("stopAction", () => {
    state.currentLyric = null;
    io.emit("stop");
    logState("stopAction", "stop");
  });

  socket.on("getCurrentStateAction", () => {
    io.emit("currentState", state);
    logState("getCurrentStateAction", "currentState");
  });

  socket.on("refreshDisplayAction", () => {
    console.log("Refreshing display...");
    io.emit("refreshDisplay");
    logState("refreshDisplayAction", "refreshDisplay");
  });
});

httpServer.listen(3000, () => {
  console.log("Listening at :3000...");
});
