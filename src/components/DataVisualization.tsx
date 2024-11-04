import React from 'react';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import { TrendingUp, PieChart, BarChart2, LineChart } from 'lucide-react';

interface DataVisualizationProps {
  type: 'sales' | 'comparison' | 'trend' | 'distribution';
  title: string;
  description?: string;
  data: any;
  isDummy?: boolean;
}

export const DataVisualization: React.FC<DataVisualizationProps> = ({
  type,
  title,
  description,
  data,
  isDummy
}) => {
  const chartOptions = {
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
        cornerRadius: 8
      }
    },
    scales: type !== 'distribution' ? {
      x: {
        grid: { display: false },
        ticks: {
          font: {
            family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            size: 12
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
        ticks: {
          font: {
            family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            size: 12
          }
        }
      }
    } : undefined
  };

  const renderChart = () => {
    switch (type) {
      case 'sales':
        return <Line data={data} options={chartOptions} className="max-h-[400px]" />;
      case 'comparison':
        return <Bar data={data} options={chartOptions} className="max-h-[400px]" />;
      case 'trend':
        return <Line data={data} options={chartOptions} className="max-h-[400px]" />;
      case 'distribution':
        return <Doughnut data={data} options={chartOptions} className="max-h-[400px]" />;
      default:
        return <Bar data={data} options={chartOptions} className="max-h-[400px]" />;
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'sales':
        return TrendingUp;
      case 'comparison':
        return BarChart2;
      case 'trend':
        return LineChart;
      case 'distribution':
        return PieChart;
      default:
        return BarChart2;
    }
  };

  const Icon = getIcon();

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-black/5 rounded-xl">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          {description && (
            <p className="text-sm text-black/60">{description}</p>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-black/5 shadow-lg">
        {isDummy && (
          <p className="text-sm text-black/60 mb-4">
            Note: This visualization uses sample data for demonstration purposes
          </p>
        )}
        {renderChart()}
      </div>
    </div>
  );
};