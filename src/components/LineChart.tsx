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
      // x: {
      //   ticks: {
      //     callback: function (value: any, index: any, ticks: any) {
      //       return min2Readable(toNumber(value) / 60);
      //     },
      //   },
      // },
      // ...data.slice(0, 2).reduce(
      //   (ret, axis, axisIndex) => ({
      //     ...ret,
      //     [axisIndex ? `y${axisIndex + 1}` : 'y']: {
      //       position: axisIndex === 0 ? ('left' as const) : ('right' as const),
      //       grid: {
      //         drawBorder: false,
      //       },
      //     },
      //   }),
      //   {}
      // ),
      y: {
        position: 'left' as const,
        ticks: {
          stepSize: 1,
        },
        grid: {
          drawBorder: false,
          color: 'rgba(0, 0, 0, 0)',
        },
      },
      y1: {
        position: 'right' as const,
        grid: {
          drawBorder: false,
          color: 'rgba(0, 0, 0, 0)',
        },
      },
    },
  };

  const chartData: ChartData<'line', (number | [number, number] | null)[]> = {
    labels: labels,
    datasets: data.slice(0, 2).reduce(
      (ret, axis, axisIndex) => [
        ...ret,
        ...axis.map((d) => ({
          type: 'line' as const,
          label: d.label,
          data: d.data,
          yAxisID: axisIndex ? `y${axisIndex}` : 'y',
        })),
      ],
      []
    ),
  };

  return <Chart type='line' options={options} data={chartData} />;
}
