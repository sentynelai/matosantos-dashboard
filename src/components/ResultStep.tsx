import React from 'react';
import { motion } from 'framer-motion';
import { Download, Share2 } from 'lucide-react';
import { Deliverable } from '../types';
import { SalesChart } from './SalesChart';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ResultStepProps {
  deliverable: Deliverable;
  onReset: () => void;
}

export const ResultStep: React.FC<ResultStepProps> = ({ deliverable, onReset }) => {
  const exportToPDF = async () => {
    const element = document.getElementById('deliverable-content');
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });
    
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(`sentynel-report-${Date.now()}.pdf`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold">{deliverable.title}</h2>
          <p className="text-black/60">{deliverable.timestamp}</p>
        </div>
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={exportToPDF}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black text-white"
          >
            <Download size={18} />
            Export PDF
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-black/10 hover:bg-black/5"
          >
            <Share2 size={18} />
            New Analysis
          </motion.button>
        </div>
      </div>

      <motion.div
        id="deliverable-content"
        className="bg-white rounded-2xl shadow-xl p-8 border border-black/5"
      >
        <p className="text-lg mb-6">{deliverable.description}</p>
        
        <div className="mb-6">
          <SalesChart />
        </div>
        
        {deliverable.text && (
          <div className="prose max-w-none mt-8 p-6 bg-black/5 rounded-xl">
            <p className="text-black/80">{deliverable.text}</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};