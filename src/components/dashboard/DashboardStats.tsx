import { BarChart2, Clock, FileText, Users } from 'lucide-react';
import { cn } from '../../lib/utils';

const stats = [
  {
    label: 'Total Meetings',
    value: '24',
    icon: FileText,
    trend: '+12%',
    trendUp: true,
  },
  {
    label: 'Time Saved',
    value: '32hrs',
    icon: Clock,
    trend: '+8%',
    trendUp: true,
  },
  {
    label: 'Active Users',
    value: '156',
    icon: Users,
    trend: '+15%',
    trendUp: true,
  },
  {
    label: 'Completion Rate',
    value: '94%',
    icon: BarChart2,
    trend: '+2%',
    trendUp: true,
  },
];

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-blue-50 rounded-lg">
              <stat.icon className="w-6 h-6 text-blue-600" />
            </div>
            <span className={cn(
              'text-sm font-medium',
              stat.trendUp ? 'text-green-600' : 'text-red-600'
            )}>
              {stat.trend}
            </span>
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-gray-900">{stat.value}</h3>
          <p className="text-sm text-gray-600">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}