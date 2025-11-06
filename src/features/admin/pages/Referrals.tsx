import { useState } from 'react';
import { Search, Filter, Share2 } from 'lucide-react';
import Button from '../../../commonComponents/buttons/Button';

const mockReferrals = [
  { id: 'RF-001', member: 'John Doe', code: 'FIT2024', conversions: 5, commission: '$120', status: 'Active' },
  { id: 'RF-002', member: 'Jane Smith', code: 'SUMMER10', conversions: 3, commission: '$75', status: 'Pending' },
  { id: 'RF-003', member: 'Alex Johnson', code: 'AI-FIT', conversions: 8, commission: '$200', status: 'Active' },
];

const Referrals = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReferrals = mockReferrals.filter((referral) =>
    referral.member.toLowerCase().includes(searchTerm.toLowerCase()) ||
    referral.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Share2 className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Referral Management</h1>
            <p className="text-gray-600 mt-1">Track referral codes, conversions, and commissions</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
        <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search members or referral codes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" leftIcon={<Filter className="w-4 h-4" />}>
              Filters
            </Button>
            <Button>Export CSV</Button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Referral ID', 'Member', 'Code', 'Conversions', 'Commission', 'Status'].map((header) => (
                <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredReferrals.map((referral) => (
              <tr key={referral.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-700 font-medium">{referral.id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{referral.member}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{referral.code}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{referral.conversions}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{referral.commission}</td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      referral.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {referral.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Referrals;

