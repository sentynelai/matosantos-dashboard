import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Pie, Radar } from 'react-chartjs-2';
import { ChartType } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface DemoChartProps {
  type: ChartType;
  isDemoData?: boolean;
}

export const DemoChart: React.FC<DemoChartProps> = ({ type, isDemoData = false }) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const values = [65, 59, 80, 81, 56, 55];
  const values2 = [28, 48, 40, 19, 86, 27];

  const getColors = () => {
    if (isDemoData) {
      return {
        primary: 'rgb(245, 158, 11)',
        secondary: 'rgba(245, 158, 11, 0.8)',
        background: 'rgba(245, 158, 11, 0.1)',
        border: 'rgba(245, 158, 11, 0.2)'
      };
    }
    return {
      primary: 'rgb(0, 0, 0)',
      secondary: 'rgba(0, 0, 0, 0.8)',
      background: 'rgba(0, 0, 0, 0.1)',
      border: 'rgba(0, 0, 0, 0.2)'
    };
  };

  const colors = getColors();

  const baseOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        backgroundColor: isDemoData ? 'rgba(245, 158, 11, 0.9)' : 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        cornerRadius: 8,
      },
    },
  };

  const lineData = {
    labels: months,
    datasets: [
      {
        label: 'Dataset 1',
        data: values,
        borderColor: colors.primary,
        backgroundColor: colors.background,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const barData = {
    labels: months,
    datasets: [
      {
        label: 'Dataset 1',
        data: values,
        backgroundColor: colors.primary,
      },
      {
        label: 'Dataset 2',
        data: values2,
        backgroundColor: colors.secondary,
      },
    ],
  };

  const pieData = {
    labels: ['Category A', 'Category B', 'Category C', 'Category D'],
    datasets: [{
      data: [30, 25, 20, 25],
      backgroundColor: [
        colors.primary,
        colors.secondary,
        `${colors.primary}66`,
        `${colors.primary}33`,
      ],
    }],
  };

  const radarData = {
    labels: ['Revenue', 'Growth', 'Users', 'Retention', 'Satisfaction', 'Innovation'],
    datasets: [{
      label: 'Current',
      data: [65, 59, 80, 81, 56, 55],
      borderColor: colors.primary,
      backgroundColor: colors.background,
    }],
  };

  const renderChart = () => {
    switch (type) {
      case 'line':
        return <Line data={lineData} options={baseOptions} />;
      case 'bar':
        return <Bar data={barData} options={baseOptions} />;
      case 'pie':
        return <Pie data={pieData} options={baseOptions} />;
      case 'radar':
        return <Radar data={radarData} options={baseOptions} />;
      case 'mixed':
        return (
          <div className="grid grid-cols-2 gap-4">
            <Line data={lineData} options={baseOptions} />
            <Bar data={barData} options={baseOptions} />
          </div>
        );
      default:
        return <Line data={lineData} options={baseOptions} />;
    }
  };

  return (
    <div className={`bg-white p-6 rounded-xl border ${
      isDemoData ? 'border-amber-200' : 'border-black/5'
    } shadow-lg`}>
      {renderChart()}
    </div>
  );
};