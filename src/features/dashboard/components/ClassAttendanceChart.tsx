import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ClassAttendanceChartProps {
  data?: {
    className: string;
    attendance: number;
  }[];
}

const ClassAttendanceChart: React.FC<ClassAttendanceChartProps> = ({ data = [] }) => {
  // Default mock data if no data provided
  const chartData = data.length > 0 ? data : [
    { className: 'Yoga', attendance: 45 },
    { className: 'Cardio', attendance: 60 },
    { className: 'Strength', attendance: 35 },
    { className: 'CrossFit', attendance: 50 },
  ];

  const colors = [
    'rgba(59, 130, 246, 0.8)',
    'rgba(34, 197, 94, 0.8)',
    'rgba(168, 85, 247, 0.8)',
    'rgba(251, 146, 60, 0.8)',
  ];

  const chartConfig = {
    labels: chartData.map((item) => item.className),
    datasets: [
      {
        data: chartData.map((item) => item.attendance),
        backgroundColor: colors,
        borderColor: colors.map((color) => color.replace('0.8', '1')),
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <div className="h-64">
      <Doughnut data={chartConfig} options={options} />
    </div>
  );
};

export default ClassAttendanceChart;

