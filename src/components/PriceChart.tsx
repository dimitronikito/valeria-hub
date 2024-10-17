'use client';
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';

const priceData = [
  { date: '2023-01', price: 100, volume: 50 },
  { date: '2023-02', price: 120, volume: 60 },
  { date: '2023-03', price: 110, volume: 55 },
  { date: '2023-04', price: 130, volume: 70 },
  { date: '2023-05', price: 150, volume: 80 },
  { date: '2023-06', price: 140, volume: 75 },
];

const PriceChart: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleMouseMove = (props: any) => {
    if (props && props.activeTooltipIndex !== undefined) {
      setActiveIndex(props.activeTooltipIndex);
    } else {
      setActiveIndex(null);
    }
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <motion.div
      className="bg-indigo-900 p-6 rounded-lg shadow-xl relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-96 relative">
        <div className="absolute inset-0 backdrop-blur-sm z-10"></div>
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-indigo-800 px-6 py-3 rounded-full shadow-lg"
          >
            <h2 className="text-2xl font-bold text-yellow-400">Coming Soon</h2>
          </motion.div>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={priceData}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
            <XAxis dataKey="date" stroke="#e2e8f0" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="left" stroke="#e2e8f0" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" stroke="#e2e8f0" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#2d3748', border: 'none', borderRadius: '8px', padding: '10px' }}
              labelStyle={{ color: '#e2e8f0', marginBottom: '5px' }}
              itemStyle={{ padding: '2px 0' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="price"
              stroke="#fbbf24"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 8 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="volume"
              stroke="#34d399"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6 text-center relative z-20">
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-lg font-semibold mb-2">
              Date: <span className="text-yellow-400">{priceData[activeIndex].date}</span>
            </p>
            <p className="text-md">
              Price: <span className="text-yellow-400">${priceData[activeIndex].price}</span>
            </p>
            <p className="text-md mt-1">
              Volume: <span className="text-green-400">{priceData[activeIndex].volume}</span>
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default PriceChart;