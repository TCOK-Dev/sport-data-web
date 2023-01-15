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
import { min2Readable, toNumber } from '../utils/math.utils';

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
  data: Array<Array<{ label: string; data: Array<number> }>>;
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
          callback: function (value: any, index: any, ticks: any) {
            return min2Readable(toNumber(value) / 60);
          },
        },
      },
      ...data.slice(0, 2).reduce(
        (ret, axis, axisIndex) => ({
          ...ret,
          [`y${axisIndex + 1}`]: {
            position: axisIndex === 0 ? 'left' : 'right',
          },
        }),
        {}
      ),
    },
  };

  const chartData: ChartData<'line', (number | [number, number] | null)[]> = {
    labels: labels,
    datasets: data.reduce(
      (ret, axis, axisIndex) => [
        ...ret,
        ...axis.map((d) => ({
          type: 'line' as const,
          label: d.label,
          data: d.data,
          yAxisID: `y${axisIndex}`,
        })),
      ],
      []
    ),
  };

  return <Chart type='line' options={options} data={chartData} />;
}
