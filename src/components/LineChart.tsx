import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
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
  data: propsData = [],
  title = '',
}: {
  data: Array<{ label: string; data: Array<number> }>;
  title?: string;
}) {
  const options: any = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    cornerRadius: 4,
    maintainAspectRatio: false,
    plugins: {
      // legend: {
      //   display: false,
      // },
      title: {
        display: true,
        color: '#000',
        text: title,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#828B9B', // not 'fontColor:' anymore
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        ticks: {
          stepSize: 1,
          color: '#828B9B',
          beginAtZero: true,
        },
        grid: {
          drawBorder: false,
          color: '#f2f2f2',
        },
      },
    },
  };

  const data: any = {
    labels: propsData.map((d: any) => {
      return d.label;
    }),
    datasets: propsData.map((d: any) => ({
      type: 'line' as const,
      label: 'Total Amount',
      data: d.data,
      backgroundColor: '#536DFE',
      borderColor: '#536DFE',
      yAxisID: 'y1',
    })),
  };

  return <Chart type='bar' options={options} data={data} />;
}
