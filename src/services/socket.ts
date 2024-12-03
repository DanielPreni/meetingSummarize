import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

const socket = io(SOCKET_URL, {
  transports: ['websocket', 'polling'],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error);
});

export const startTranscription = (audioChunk: Blob) => {
  return new Promise((resolve, reject) => {
    socket.emit('startTranscription', audioChunk);
    socket.once('transcription', resolve);
    socket.once('error', reject);
  });
};

export const generateSummary = (transcript: string) => {
  return new Promise((resolve, reject) => {
    socket.emit('generateSummary', transcript);
    socket.once('summary', resolve);
    socket.once('error', reject);
  });
};

export { socket };