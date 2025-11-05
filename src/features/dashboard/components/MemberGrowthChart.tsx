import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface MemberGrowthChartProps {
  data?: {
    month: string;
    members: number;
  }[];
}

const MemberGrowthChart: React.FC<MemberGrowthChartProps> = ({ data = [] }) => {
  // Default mock data if no data provided
  const chartData = data.length > 0 ? data : [
    { month: 'Jan', members: 120 },
    { month: 'Feb', members: 135 },
    { month: 'Mar', members: 142 },
    { month: 'Apr', members: 150 },
    { month: 'May', members: 148 },
    { month: 'Jun', members: 156 },
  ];

  const chartConfig = {
    labels: chartData.map((item) => item.month),
    datasets: [
      {
        label: 'New Members',
        data: chartData.map((item) => item.members),
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  return (
    <div className="h-64">
      <Bar data={chartConfig} options={options} />
    </div>
  );
};

export default MemberGrowthChart;

