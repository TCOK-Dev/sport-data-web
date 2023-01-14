import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  registerables,
  Title,
  Tooltip,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ...registerables
);

export function LineChart({
  data = [],
  labels = [],
}: {
  data: Array<{ label: string; data: Array<number> }>;
  labels?: Array<number | string>;
}) {
  const options: any = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    cornerRadius: 4,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: '#828B9B', // not 'fontColor:' anymore
          // Include a dollar sign in the ticks
          callback: function (value: any, index: any, ticks: any) {
            return ;
          },
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
  };

  const chartData: ChartData<'line', (number | [number, number] | null)[]> = {
    labels: labels,
    datasets: data.map((d) => ({
      type: 'line' as const,
      label: d.label,
      data: d.data,
    })),
  };

  return <Chart type='line' options={options} data={chartData} />;
}
