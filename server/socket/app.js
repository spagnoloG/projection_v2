"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer);
let state = {
  currentLyric: null,
};
io.on("connection", (socket) => {
  socket.on("setLyricAction", (data) => {
    state = data;
    logState();
    io.emit("", state);
  });
  socket.on("swipeLeftAction", () => {
    io.emit("swipeLeft");
  });
  socket.on("swipeRightAction", () => {
    io.emit("swipeLeft");
  });
  socket.on("stopAction", () => {
    io.emit("stop");
  });
  socket.on("getCurrentStateAction", () => {
    logState();
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
function logState() {
  console.log(`Current lyric: ${state.currentLyric}`);
}
