import { io, Socket } from 'socket.io-client';
import { SocketState } from '../types';

const SOCKET_BASE_URL = 'http://localhost:3000';
let socket: Socket | null = null;

export const connectSocket = () => {
  console.log('Connecting to WebSocket server...');
  if (!socket) {
    socket = io(SOCKET_BASE_URL);

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });
  }
};

export const onCurrentState = (callback: (state: SocketState) => void) => {
  socket?.on('currentState', callback);
};

export const onRefreshDisplay = (callback: () => void) => {
  socket?.on('refreshDisplay', callback);
};

export const onSwipeLeft = (callback: () => void) => {
  socket?.on('swipeLeft', callback);
};

export const onSwipeRight = (callback: () => void) => {
  socket?.on('swipeRight', callback);
};

export const onStop = (callback: () => void) => {
  socket?.on('stop', callback);
};

export const setLyricAction = (lyric: SocketState) => {
  socket?.emit('setLyricAction', lyric);
};

export const onSetLyric = (callback: (lyric: SocketState) => void) => {
  socket?.on('setLyric', callback);
};

export const swipeLeftAction = () => {
  socket?.emit('swipeLeftAction');
};

export const swipeRightAction = () => {
  socket?.emit('swipeRightAction');
};

export const stopAction = () => {
  socket?.emit('stopAction');
};

export const getCurrentStateAction = () => {
  socket?.emit('getCurrentStateAction');
};

export const refreshDisplayAction = () => {
  socket?.emit('refreshDisplayAction');
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
