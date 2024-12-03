import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from './components/ui/button';
import { DashboardStats } from './components/dashboard/DashboardStats';
import { MeetingCard } from './components/meeting/MeetingCard';
import { RecordMeeting } from './components/meeting/RecordMeeting';
import { useMeetingStore } from './store/meetingStore';

function App() {
  const { meetings } = useMeetingStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Meeting Summarizer</h1>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Meeting
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Dashboard Overview</h2>
            <DashboardStats />
          </section>

          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Meetings</h2>
              <Button variant="outline">View All</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {meetings.map((meeting) => (
                <MeetingCard key={meeting.id} {...meeting} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <RecordMeeting />
    </div>
  );
}

export default App;