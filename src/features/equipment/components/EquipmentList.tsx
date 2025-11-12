import { useQuery } from '@tanstack/react-query';
import { getEquipmentApi } from '../../../services/equipmentApis';
import { Package } from 'lucide-react';
import { formatDate } from '../../../utils/dateUtils';
import LoadingSpinner from '../../../commonComponents/loading-spinner/LoadingSpinner';

const EquipmentList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['equipment'],
    queryFn: getEquipmentApi,
  });

  const equipmentList = data?.data || [];

  const getConditionBadgeColor = (condition: string) => {
    switch (condition) {
      case 'New':
        return 'bg-green-100 text-green-700';
      case 'Good':
        return 'bg-blue-100 text-blue-700';
      case 'In Maintenance':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (equipmentList.length === 0) {
    return (
      <div className="text-center py-8">
        <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">No equipment available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {equipmentList.slice(0, 5).map((equipment) => (
        <div
          key={equipment.id}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Package className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">{equipment.name}</p>
              <p className="text-xs text-gray-500">Purchased: {formatDate(equipment.purchaseDate)}</p>
            </div>
          </div>
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getConditionBadgeColor(
              equipment.condition
            )}`}
          >
            {equipment.condition}
          </span>
        </div>
      ))}
      {equipmentList.length > 5 && (
        <p className="text-xs text-gray-500 text-center pt-2">
          Showing 5 of {equipmentList.length} equipment items
        </p>
      )}
    </div>
  );
};

export default EquipmentList;

