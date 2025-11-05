import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { ClassSchedule } from '../types/class.types';

interface ClassScheduleCalendarProps {
  schedule: ClassSchedule[];
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
}

const ClassScheduleCalendar: React.FC<ClassScheduleCalendarProps> = ({
  schedule,
  selectedDate = new Date(),
  onDateSelect,
}) => {
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 0 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getClassesForDay = (date: Date) => {
    return schedule.filter((item) => isSameDay(new Date(item.date), date));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Weekly Schedule</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day, index) => {
          const dayClasses = getClassesForDay(day);
          const isToday = isSameDay(day, new Date());
          const isSelected = selectedDate && isSameDay(day, selectedDate);

          return (
            <div
              key={index}
              className={`
                border rounded-lg p-3 cursor-pointer transition-colors
                ${isToday ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
                ${isSelected ? 'ring-2 ring-blue-500' : ''}
                hover:bg-gray-50
              `}
              onClick={() => onDateSelect?.(day)}
            >
              <div className="text-center mb-2">
                <p className="text-xs text-gray-500">{format(day, 'EEE')}</p>
                <p className={`text-lg font-semibold ${isToday ? 'text-blue-600' : 'text-gray-800'}`}>
                  {format(day, 'd')}
                </p>
              </div>
              <div className="space-y-1">
                {dayClasses.slice(0, 2).map((classItem, idx) => (
                  <div
                    key={idx}
                    className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded truncate"
                  >
                    {format(new Date(`2000-01-01T${classItem.startTime}`), 'h:mm a')}
                  </div>
                ))}
                {dayClasses.length > 2 && (
                  <p className="text-xs text-gray-500">+{dayClasses.length - 2} more</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClassScheduleCalendar;

