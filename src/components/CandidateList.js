import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { motion } from 'framer-motion';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function CandidateList({ candidates, onVote }) {
  const chartData = {
    labels: candidates.map(c => c.name),
    datasets: [
      {
        label: 'Vote Count',
        data: candidates.map(c => Number(c.voteCount)),
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
        borderColor: 'rgba(79, 70, 229, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { 
        position: 'top',
        labels: { font: { size: 14 } }
      },
      title: { 
        display: true, 
        text: 'Voting Results',
        font: { size: 18 }
      },
      tooltip: {
        backgroundColor: 'rgba(30, 41, 59, 0.9)',
        titleFont: { size: 16 },
        bodyFont: { size: 14 },
        padding: 12,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { font: { size: 12 } },
        grid: { color: 'rgba(0, 0, 0, 0.05)' }
      },
      x: {
        ticks: { font: { size: 12 } },
        grid: { display: false }
      }
    }
  };

  return (
    <div className="w-full max-w-4xl">
      
      {candidates.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Candidates</h2>
          <div className="text-5xl mb-4">🗳️</div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">No candidates yet</h3>
          <p className="text-gray-500">Connect wallet to see poll or add candidates to start the voting process</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {candidates.map((c) => (
              <motion.div 
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{c.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">ID: {c.id}</p>
                    </div>
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {Number(c.voteCount)} votes
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onVote(c.id)}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2.5 rounded-lg font-medium hover:shadow-lg transition-all"
                  >
                    Vote
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-lg p-5 border border-gray-100"
          >
            <Bar data={chartData} options={options} />
          </motion.div>
        </div>
      )}
    </div>
  );
}