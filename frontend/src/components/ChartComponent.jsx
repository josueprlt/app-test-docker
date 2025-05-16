import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function ChartComponent({ title, data, options, type = 'line', props = string }) {
  return (
    <div className={`flex flex-col justify-center p-2 ${props}`}>
      <h2 className="text-center text-lg font-semibold mb-2">{title}</h2>
      {type === 'line' && <Line data={data} options={options} />}
      {type === 'doughnut' && <Doughnut data={data} options={options} />}
    </div>
  );
}

export default ChartComponent;