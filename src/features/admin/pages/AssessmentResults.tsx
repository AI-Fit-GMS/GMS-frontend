import { useState } from 'react';
import { LineChart, FileBarChart, Filter } from 'lucide-react';
import Button from '../../../commonComponents/buttons/Button';

const mockAssessments = [
  { id: 'AS-9001', member: 'Emily Carter', score: 88, percentile: 92, completedOn: '2024-06-30' },
  { id: 'AS-9002', member: 'Michael Lee', score: 72, percentile: 75, completedOn: '2024-07-02' },
  { id: 'AS-9003', member: 'Sophia Brown', score: 95, percentile: 98, completedOn: '2024-07-05' },
];

const AssessmentResults = () => {
  const [showHighPerformers, setShowHighPerformers] = useState(false);

  const filteredAssessments = showHighPerformers
    ? mockAssessments.filter((assessment) => assessment.percentile >= 90)
    : mockAssessments;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-purple-50 rounded-lg">
            <LineChart className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Assessment Results</h1>
            <p className="text-gray-600 mt-1">Review member performance and export progress reports</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button leftIcon={<FileBarChart className="w-4 h-4" />}>Export Reports</Button>
          <Button variant="outline">Download CSV</Button>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            leftIcon={<Filter className="w-4 h-4" />}
            onClick={() => setShowHighPerformers((prev) => !prev)}
          >
            {showHighPerformers ? 'Show All' : 'High Performers'}
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Assessment ID', 'Member', 'Score', 'Percentile', 'Completed On', 'Actions'].map((header) => (
                <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAssessments.map((assessment) => (
              <tr key={assessment.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-700">{assessment.id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{assessment.member}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{assessment.score}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{assessment.percentile}th</td>
                <td className="px-6 py-4 text-sm text-gray-700">{assessment.completedOn}</td>
                <td className="px-6 py-4 text-sm text-right space-x-2">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    Download
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

export default AssessmentResults;

