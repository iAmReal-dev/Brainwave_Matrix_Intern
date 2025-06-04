import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';

export default function AddCandidate({ onAddCandidate }) {
  const [name, setName] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onAddCandidate(name);
      setName('');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 w-full max-w-md bg-white rounded-xl shadow-lg p-6 border border-gray-100"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
        <FaPlus className="mr-2 text-blue-500" />
        Add Candidate
      </h2>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <div className={`flex-1 relative ${isFocused ? 'ring-2 ring-blue-500 rounded-lg' : ''}`}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Candidate name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
            aria-label="Candidate name"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg hover:shadow-lg transition-all flex items-center"
        >
          <FaPlus />
        </motion.button>
      </form>
    </motion.div>
  );
}