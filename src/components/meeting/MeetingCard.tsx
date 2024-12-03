import { Calendar, Clock, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

interface MeetingCardProps {
  title: string;
  date: string;
  duration: string;
  participants: number;
  status: 'upcoming' | 'completed' | 'in-progress';
}

export function MeetingCard({ title, date, duration, participants, status }: MeetingCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <span className={cn(
          'px-2 py-1 rounded-full text-sm',
          {
            'bg-blue-100 text-blue-800': status === 'upcoming',
            'bg-green-100 text-green-800': status === 'completed',
            'bg-yellow-100 text-yellow-800': status === 'in-progress',
          }
        )}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm">{date}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          <span className="text-sm">{duration}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Users className="w-4 h-4 mr-2" />
          <span className="text-sm">{participants} participants</span>
        </div>
      </div>

      <div className="flex space-x-2">
        <Button variant="primary" size="sm">
          View Summary
        </Button>
        <Button variant="outline" size="sm">
          Share
        </Button>
      </div>
    </div>
  );
}