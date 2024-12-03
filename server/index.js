import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { OpenAI } from 'openai';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const httpServer = createServer(app);

const FRONTEND_URL = process.env.NODE_ENV === 'production' 
  ? process.env.FRONTEND_URL 
  : 'http://localhost:5173';

const io = new Server(httpServer, {
  cors: {
    origin: FRONTEND_URL,
    methods: ["GET", "POST"]
  }
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(cors({
  origin: FRONTEND_URL
}));
app.use(express.json());

// Serve static files from the dist directory in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '../dist')));
}

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('startTranscription', async (audioChunk) => {
    try {
      // Save audio chunk temporarily
      const tempFile = join(__dirname, 'temp', `chunk-${Date.now()}.wav`);
      await fs.writeFile(tempFile, Buffer.from(audioChunk));

      // Transcribe with Whisper
      const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(tempFile),
        model: "whisper-1",
      });

      // Send transcription back to client
      socket.emit('transcription', transcription.text);

      // Clean up temp file
      await fs.unlink(tempFile);
    } catch (error) {
      console.error('Transcription error:', error);
      socket.emit('error', 'Transcription failed');
    }
  });

  socket.on('generateSummary', async (transcript) => {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that summarizes meeting transcripts. Create a concise summary with key points and action items."
          },
          {
            role: "user",
            content: transcript
          }
        ]
      });

      socket.emit('summary', completion.choices[0].message.content);
    } catch (error) {
      console.error('Summary generation error:', error);
      socket.emit('error', 'Summary generation failed');
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Create temp directory if it doesn't exist
await fs.mkdir(join(__dirname, 'temp'), { recursive: true });

// Handle all other routes by serving index.html in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../dist/index.html'));
  });
}

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});