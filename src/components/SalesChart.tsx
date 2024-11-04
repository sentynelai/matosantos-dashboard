import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TrendingUp } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface SalesData {
  year: number;
  data: number[];
}

const historicalData: SalesData[] = [
  {
    year: 2020,
    data: [50, 52, 53, 55, 56, 58, 60, 62, 64, 66, 68, 70]
  },
  {
    year: 2021,
    data: [72, 74, 76, 78, 80, 82, 85, 87, 89, 92, 95, 97]
  },
  {
    year: 2022,
    data: [100, 102, 105, 107, 110, 113, 116, 120, 123, 126, 130, 134]
  }
];

// Calculate projected data for 2023 using linear regression
const calculateProjection = (data: number[]): number[] => {
  const monthlyGrowth = (data[data.length - 1] - data[0]) / (data.length - 1);
  const lastValue = data[data.length - 1];
  return Array.from({ length: 12 }, (_, i) => Math.round(lastValue + (monthlyGrowth * (i + 1))));
};

const projectedData: SalesData = {
  year: 2023,
  data: calculateProjection(historicalData[2].data)
};

export const SalesChart: React.FC = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const data = {
    labels: months,
    datasets: [
      ...historicalData.map((yearData) => ({
        label: `${yearData.year} Sales`,
        data: yearData.data,
        borderColor: `rgba(0, 0, 0, ${0.3 + (yearData.year - 2020) * 0.2})`,
        backgroundColor: `rgba(0, 0, 0, ${0.05 + (yearData.year - 2020) * 0.05})`,
        tension: 0.4,
        fill: false,
        pointRadius: 4,
        pointHoverRadius: 6,
      })),
      {
        label: '2023 Projection',
        data: projectedData.data,
        borderColor: 'rgba(0, 0, 0, 1)',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderDash: [5, 5],
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          size: 13
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context: any) => `Sales: ${context.raw}k units`
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            size: 12
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          font: {
            family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            size: 12
          },
          callback: (value: number) => `${value}k`
        }
      }
    }
  };

  const getGrowthRate = () => {
    const lastYear = historicalData[2].data;
    const firstYear = historicalData[0].data;
    const totalGrowth = ((lastYear[11] - firstYear[0]) / firstYear[0]) * 100;
    return totalGrowth.toFixed(1);
  };

  const getProjectedGrowth = () => {
    const currentYear = historicalData[2].data;
    const projected = projectedData.data;
    const growth = ((projected[11] - currentYear[11]) / currentYear[11]) * 100;
    return growth.toFixed(1);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-black/5 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5" />
            <h3 className="font-semibold">Historical Growth</h3>
          </div>
          <p className="text-3xl font-bold">{getGrowthRate()}%</p>
          <p className="text-sm text-black/60">Over 3 years</p>
        </div>
        
        <div className="bg-black/5 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5" />
            <h3 className="font-semibold">Projected Growth</h3>
          </div>
          <p className="text-3xl font-bold">{getProjectedGrowth()}%</p>
          <p className="text-sm text-black/60">Expected in 2023</p>
        </div>

        <div className="bg-black/5 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5" />
            <h3 className="font-semibold">Current Sales</h3>
          </div>
          <p className="text-3xl font-bold">{historicalData[2].data[11]}k</p>
          <p className="text-sm text-black/60">Units per month</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-black/5 shadow-lg">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Tostones Sales Projection</h2>
          <p className="text-sm text-black/60">
            Note: This visualization uses dummy data for demonstration purposes
          </p>
        </div>
        <Line data={data} options={options} className="max-h-[400px]" />
      </div>
    </div>
  );
};