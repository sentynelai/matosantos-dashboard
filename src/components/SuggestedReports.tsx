import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  LineChart, 
  BarChart2, 
  PieChart,
  Target,
  Calendar,
  Share2,
  Award,
  ArrowRight
} from 'lucide-react';

interface ReportSuggestion {
  icon: React.ElementType;
  title: string;
  description: string;
  prompt: string;
}

const suggestions: ReportSuggestion[] = [
  {
    icon: Target,
    title: "Predictive Analytics",
    description: "Get AI-powered predictions and insights for future performance",
    prompt: "Generate predictive analytics for next quarter's performance"
  },
  {
    icon: Calendar,
    title: "Weekly Action Plan",
    description: "Receive data-driven recommendations for the week ahead",
    prompt: "Create a weekly action plan based on current metrics"
  },
  {
    icon: Share2,
    title: "Social Media Pulse",
    description: "Monitor and analyze social media performance metrics",
    prompt: "Analyze our social media performance across platforms"
  },
  {
    icon: Award,
    title: "Competitive Edge",
    description: "Track market position and competitive advantages",
    prompt: "Compare our market position with competitors"
  }
];

interface SuggestedReportsProps {
  onSelect: (prompt: string) => void;
  disabled?: boolean;
}

export const SuggestedReports: React.FC<SuggestedReportsProps> = ({ onSelect, disabled }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-black/80">Suggested Reports</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {suggestions.map((suggestion, index) => {
          const Icon = suggestion.icon;
          return (
            <motion.button
              key={index}
              onClick={() => !disabled && onSelect(suggestion.prompt)}
              disabled={disabled}
              className={`group flex items-start gap-4 p-4 rounded-xl border border-black/5 
                bg-white/50 backdrop-blur-sm text-left transition-all duration-200
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-black/20 hover:bg-black/5'}`}
              whileHover={disabled ? {} : { scale: 1.02 }}
              whileTap={disabled ? {} : { scale: 0.98 }}
            >
              <div className="p-2 rounded-lg bg-black/5 text-black">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-grow">
                <h4 className="font-medium mb-1 text-black/80">{suggestion.title}</h4>
                <p className="text-sm text-black/60 mb-2">{suggestion.description}</p>
                <div className={`flex items-center gap-1 text-sm font-medium
                  ${disabled ? 'text-black/40' : 'text-black group-hover:text-black/80'}`}>
                  Generate report
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}