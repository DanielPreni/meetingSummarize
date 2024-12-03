import { create } from 'zustand';

interface Meeting {
  id: string;
  title: string;
  date: string;
  duration: string;
  participants: number;
  status: 'upcoming' | 'completed' | 'in-progress';
  recording?: Blob;
  transcript?: string;
  summary?: string;
}

interface MeetingStore {
  meetings: Meeting[];
  currentMeeting: Meeting | null;
  startMeeting: (title: string) => void;
  endMeeting: (recording: Blob) => void;
  addTranscript: (id: string, transcript: string) => void;
  addSummary: (id: string, summary: string) => void;
}

export const useMeetingStore = create<MeetingStore>((set) => ({
  meetings: [],
  currentMeeting: null,
  startMeeting: (title) => {
    const newMeeting = {
      id: Date.now().toString(),
      title,
      date: new Date().toLocaleDateString(),
      duration: '0:00',
      participants: 1,
      status: 'in-progress' as const,
    };
    set((state) => ({
      meetings: [...state.meetings, newMeeting],
      currentMeeting: newMeeting,
    }));
  },
  endMeeting: (recording) => {
    set((state) => ({
      meetings: state.meetings.map((meeting) =>
        meeting.id === state.currentMeeting?.id
          ? { ...meeting, status: 'completed' as const, recording }
          : meeting
      ),
      currentMeeting: null,
    }));
  },
  addTranscript: (id, transcript) => {
    set((state) => ({
      meetings: state.meetings.map((meeting) =>
        meeting.id === id ? { ...meeting, transcript } : meeting
      ),
    }));
  },
  addSummary: (id, summary) => {
    set((state) => ({
      meetings: state.meetings.map((meeting) =>
        meeting.id === id ? { ...meeting, summary } : meeting
      ),
    }));
  },
}));