import { useState } from 'react';
import { Upload, Calendar, Filter } from 'lucide-react';
import Button from '../../../commonComponents/buttons/Button';

const mockWorkshops = [
  { id: 'WS-1001', title: 'Functional Training Basics', date: '2024-07-12', registrants: 45, status: 'Scheduled' },
  { id: 'WS-1002', title: 'Nutrition & Diet Planning', date: '2024-07-18', registrants: 60, status: 'Registration Closed' },
  { id: 'WS-1003', title: 'AI-Fit Trainer Certification', date: '2024-08-02', registrants: 32, status: 'Draft' },
];

const WorkshopRegistrations = () => {
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'scheduled' | 'closed' | 'draft'>('all');

  const filteredWorkshops = mockWorkshops.filter((workshop) => {
    if (selectedStatus === 'all') return true;
    if (selectedStatus === 'scheduled') return workshop.status === 'Scheduled';
    if (selectedStatus === 'closed') return workshop.status === 'Registration Closed';
    return workshop.status === 'Draft';
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-orange-50 rounded-lg">
            <Calendar className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Workshop Registrations</h1>
            <p className="text-gray-600 mt-1">Manage workshop schedules, participants, and reminders</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200 flex flex-wrap gap-3 items-center justify-between">
        <div className="flex items-center gap-3">
          <Button leftIcon={<Upload className="w-4 h-4" />}>Import CSV</Button>
          <Button variant="outline">Export Summary</Button>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" leftIcon={<Filter className="w-4 h-4" />}>
            Filters
          </Button>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="closed">Registration Closed</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Workshop ID', 'Title', 'Date', 'Registrants', 'Status', 'Actions'].map((header) => (
                <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredWorkshops.map((workshop) => (
              <tr key={workshop.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-700">{workshop.id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{workshop.title}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{workshop.date}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{workshop.registrants}</td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      workshop.status === 'Scheduled'
                        ? 'bg-blue-100 text-blue-700'
                        : workshop.status === 'Registration Closed'
                        ? 'bg-gray-100 text-gray-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {workshop.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-right space-x-2">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    Remind
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkshopRegistrations;

