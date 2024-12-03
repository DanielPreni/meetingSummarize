# Meeting Summarizer

An AI-powered meeting transcription and summarization tool built with React, Node.js, and OpenAI.

## Features

- Real-time meeting transcription
- AI-powered meeting summarization
- Dashboard with meeting statistics
- Meeting history and management
- WebSocket-based live updates

## Prerequisites

- Node.js 18 or higher
- OpenAI API key
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/meeting-summarizer.git
cd meeting-summarizer
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
OPENAI_API_KEY=your-openai-api-key
VITE_SERVER_URL=http://localhost:3000
```

## Development

1. Start the development server:
```bash
npm run dev
```

This will start both the Vite frontend server and the Node.js backend server concurrently.

## Production Deployment

1. Build the frontend:
```bash
npm run build
```

2. Start the production server:
```bash
NODE_ENV=production npm start
```

## Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key
- `VITE_SERVER_URL`: Backend server URL (default: http://localhost:3000)
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)

## Tech Stack

- Frontend:
  - React
  - TypeScript
  - Vite
  - Tailwind CSS
  - Socket.io Client
  - Zustand

- Backend:
  - Node.js
  - Express
  - Socket.io
  - OpenAI API

## License

MIT