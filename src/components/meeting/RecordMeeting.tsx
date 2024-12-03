import React, { useState, useEffect } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { Mic, MicOff, Loader } from 'lucide-react';
import { Button } from '../ui/button';
import { useMeetingStore } from '../../store/meetingStore';
import { startTranscription, generateSummary } from '../../services/socket';

export function RecordMeeting() {
  const [title, setTitle] = useState('');
  const [isStarting, setIsStarting] = useState(false);
  const [transcript, setTranscript] = useState('');
  const { startMeeting, endMeeting, currentMeeting, addTranscript, addSummary } = useMeetingStore();

  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    clearBlobUrl,
  } = useReactMediaRecorder({
    audio: true,
    video: false,
    onStop: async (blobUrl) => {
      const response = await fetch(blobUrl);
      const blob = await response.blob();
      
      // Get final transcription
      const finalTranscript = await startTranscription(blob);
      setTranscript(finalTranscript as string);
      
      // Generate summary
      const summary = await generateSummary(finalTranscript as string);
      
      // Update store
      if (currentMeeting) {
        addTranscript(currentMeeting.id, finalTranscript as string);
        addSummary(currentMeeting.id, summary as string);
      }
      
      endMeeting(blob);
      clearBlobUrl();
    },
  });

  const handleStartMeeting = async () => {
    if (!title) return;
    setIsStarting(true);
    try {
      await startRecording();
      startMeeting(title);
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
    setIsStarting(false);
  };

  const handleStopMeeting = () => {
    stopRecording();
  };

  if (status === 'recording') {
    return (
      <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Mic className="w-5 h-5 text-red-500 animate-pulse" />
            <span className="ml-2">Recording in progress...</span>
          </div>
          <Button onClick={handleStopMeeting} variant="outline">
            Stop Recording
          </Button>
        </div>
        {transcript && (
          <div className="mt-2 text-sm text-gray-600">
            <p>Live Transcript: {transcript}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg">
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Meeting title"
          className="border rounded px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button
          onClick={handleStartMeeting}
          disabled={!title || isStarting}
          className="flex items-center"
        >
          {isStarting ? (
            <Loader className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Mic className="w-4 h-4 mr-2" />
          )}
          Start Recording
        </Button>
      </div>
    </div>
  );
}