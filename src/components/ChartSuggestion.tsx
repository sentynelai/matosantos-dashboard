import React from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  BarChart2, 
  PieChart, 
  Activity, 
  Layout, 
  ArrowRight,
  TrendingUp,
  DollarSign,
  Users,
  Target,
  AlertCircle
} from 'lucide-react';
import { ChartType } from '../types';
import { DemoChart } from './DemoChart';

interface ChartSuggestionProps {
  data: string;
  onConfirm: (type: ChartType) => void;
  onBack: () => void;
}

export const ChartSuggestion: React.FC<ChartSuggestionProps> = ({
  data,
  onConfirm,
  onBack
}) => {
  const isDemoData = !data.includes('assistant') || data.toLowerCase().includes('demo') || 
                    data.toLowerCase().includes('sample');

  const chartTypes: { type: ChartType; icon: React.ElementType; label: string }[] = [
    { type: 'line', icon: LineChart, label: 'Trend Analysis' },
    { type: 'bar', icon: BarChart2, label: 'Comparison' },
    { type: 'pie', icon: PieChart, label: 'Distribution' },
    { type: 'radar', icon: Activity, label: 'Multi-dimensional' },
    { type: 'mixed', icon: Layout, label: 'Dashboard' }
  ];

  const metrics = [
    { icon: TrendingUp, label: 'Growth Rate', value: '+12.5%' },
    { icon: DollarSign, label: 'Revenue', value: '$2,075' },
    { icon: Users, label: 'Active Users', value: '1,247' },
    { icon: Target, label: 'Conversion', value: '3.2%' }
  ];

  const suggestedType: ChartType = data.toLowerCase().includes('trend') ? 'line' :
    data.toLowerCase().includes('compar') ? 'bar' :
    data.toLowerCase().includes('distribut') ? 'pie' :
    data.toLowerCase().includes('metric') ? 'radar' : 'mixed';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-4xl mx-auto space-y-8"
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-black/5">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Chart Suggestion</h2>
            <p className="text-black/60">
              Based on Sentynel's analysis, we recommend a {suggestedType} visualization 
              for better understanding and visual appeal.
            </p>
          </div>
          {isDemoData && (
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-lg border border-amber-200">
              <AlertCircle size={18} />
              <span className="text-sm font-medium">Demo Data</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-xl ${isDemoData ? 'bg-amber-50/50 border border-amber-200/50' : 'bg-black/5'} 
                  flex items-center gap-3`}
              >
                <div className={`p-2 rounded-lg ${isDemoData ? 'bg-amber-500' : 'bg-black'} text-white`}>
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-sm text-black/60">{metric.label}</p>
                  <p className="text-lg font-semibold">{metric.value}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {chartTypes.map(({ type, icon: Icon, label }) => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onConfirm(type)}
              className={`p-4 rounded-xl border ${
                type === suggestedType
                  ? isDemoData 
                    ? 'border-amber-500 bg-amber-500 text-white'
                    : 'border-black bg-black text-white'
                  : isDemoData
                    ? 'border-amber-200 hover:border-amber-300'
                    : 'border-black/10 hover:border-black/30'
              } flex flex-col items-center gap-2 transition-colors`}
            >
              <Icon size={24} />
              <span className="text-sm font-medium">{label}</span>
              {type === suggestedType && (
                <span className="text-xs opacity-60">Recommended</span>
              )}
            </motion.button>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-black/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Preview</h3>
            {isDemoData && (
              <span className="text-sm text-amber-600">
                Sample visualization
              </span>
            )}
          </div>
          <DemoChart type={suggestedType} isDemoData={isDemoData} />
        </div>
      </div>

      <div className="flex justify-between">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="px-6 py-2 rounded-xl border border-black/10 hover:border-black/30"
        >
          Back to Query
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onConfirm(suggestedType)}
          className={`px-6 py-2 rounded-xl ${
            isDemoData ? 'bg-amber-500' : 'bg-black'
          } text-white flex items-center gap-2`}
        >
          Proceed with {suggestedType} chart
          <ArrowRight size={18} />
        </motion.button>
      </div>
    </motion.div>
  );
};