import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ProgressDataPoint {
  week: string;
  weight: number;
  calories: number;
  attendance: number;
}

interface ClientProgressChartProps {
  data?: ProgressDataPoint[];
}

const ClientProgressChart: React.FC<ClientProgressChartProps> = ({ data = [] }) => {
  const defaultData: ProgressDataPoint[] =
    data.length > 0
      ? data
      : [
          { week: 'Week 1', weight: 185, calories: 2400, attendance: 2 },
          { week: 'Week 2', weight: 182, calories: 2300, attendance: 3 },
          { week: 'Week 3', weight: 180, calories: 2200, attendance: 3 },
          { week: 'Week 4', weight: 178, calories: 2150, attendance: 4 },
          { week: 'Week 5', weight: 176, calories: 2100, attendance: 4 },
        ];

  const chartConfig = {
    labels: defaultData.map((item) => item.week),
    datasets: [
      {
        label: 'Weight (lbs)',
        data: defaultData.map((item) => item.weight),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.3,
        yAxisID: 'y',
      },
      {
        label: 'Calories',
        data: defaultData.map((item) => item.calories),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.3,
        yAxisID: 'y1',
      },
      {
        label: 'Attendance (sessions)',
        data: defaultData.map((item) => item.attendance),
        borderColor: 'rgb(249, 115, 22)',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        tension: 0.3,
        yAxisID: 'y2',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Weight (lbs)',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      y1: {
        type: 'linear' as const,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Calories',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      y2: {
        type: 'linear' as const,
        position: 'right' as const,
        display: false,
      },
    },
  };

  return (
    <div className="h-64">
      <Line data={chartConfig} options={options} />
    </div>
  );
};

export default ClientProgressChart;

