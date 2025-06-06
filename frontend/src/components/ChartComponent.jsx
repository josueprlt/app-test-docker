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
import { parseDate } from '../utils/ParseDate';

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

function ChartComponent({ title, data, options, type = 'line', props = '' }) {
  let sortedData = data;

  if (type === 'homeLine') {
    if (Array.isArray(data?.datasets)) {
      const allDates = Array.from(
        new Set(
          data.datasets.flatMap(ds => ds.data.map(point => point.x))
        )
      );

      const sortedDates = allDates.sort((a, b) => parseDate(a) - parseDate(b));
      sortedData = {
        ...data,
        datasets: data.datasets.map(ds => ({
          ...ds,
          data: sortedDates.map(date => {
            const found = ds.data.find(point => point.x === date);
            return found ? found : { x: date, y: 0 };
          })
        }))
      };
    }
  }

  return (
    <div className={`flex justify-center flex-col justify-center p-2 ${props}`}>
      <h2 className="text-center text-lg font-semibold mb-2">{title}</h2>
      {type === 'line' && <Line className='max-h-[500px]' data={data} options={options} />}
      {type === 'homeLine' && <Line className='max-h-[500px]' data={sortedData} options={options} />}
      {type === 'doughnut' && <Doughnut className='max-h-[500px]' data={data} options={options} />}
    </div>
  );
}

export default ChartComponent;