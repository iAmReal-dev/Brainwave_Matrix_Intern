import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp, FaStar, FaRocket, FaLock, FaWallet, FaNetworkWired } from 'react-icons/fa';

const faqs = [
  {
    id: 1,
    question: 'What is VoteChain?',
    answer: 'VoteChain is a decentralized voting DApp built on the Ethereum blockchain (Sepolia testnet). It allows users to vote securely, with all votes recorded transparently on-chain.',
    icon: <FaRocket className="text-purple-500" />
  },
  {
    id: 2,
    question: 'How does blockchain ensure voting security?',
    answer: 'Blockchain ensures security through immutability, transparency, and decentralization. Votes are stored on the Sepolia network, preventing tampering, and are verifiable by anyone.',
    icon: <FaLock className="text-blue-500" />
  },
  {
    id: 3,
    question: 'How do I connect my wallet?',
    answer: 'Click "Connect Wallet" in the header, then select an account in MetaMask. Ensure you\'re on the Sepolia network. If MetaMask isn\'t installed, you\'ll be prompted to install it.',
    icon: <FaWallet className="text-green-500" />
  },
  {
    id: 4,
    question: 'Who can add candidates?',
    answer: 'Only the contract owner (deployer) can add candidates. This ensures controlled candidate registration. Other users can vote for listed candidates.',
    icon: <FaStar className="text-yellow-500" />
  },
  {
    id: 5,
    question: 'What is the Sepolia testnet?',
    answer: 'Sepolia is an Ethereum test network for developers to test DApps without using real ETH. VoteChain uses Sepolia to simulate real-world blockchain interactions.',
    icon: <FaNetworkWired className="text-red-500" />
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] to-[#e6f0ff] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6"
          >
            <FaStar className="text-white text-2xl" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Everything you need to know about VoteChain and how it works
          </p>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '200px' }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-auto mt-6"
          />
        </motion.div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                onClick={() => toggleFAQ(index)}
                className="cursor-pointer p-6 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    {faq.icon}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {faq.question}
                  </h2>
                </div>
                
                <motion.div 
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  className="text-gray-400"
                >
                  {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                </motion.div>
              </motion.div>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: 'auto', 
                      opacity: 1,
                      transition: {
                        height: { duration: 0.3 },
                        opacity: { duration: 0.2, delay: 0.1 }
                      }
                    }}
                    exit={{ 
                      height: 0, 
                      opacity: 0,
                      transition: {
                        height: { duration: 0.2 },
                        opacity: { duration: 0.1 }
                      }
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <div className="border-t border-gray-100 my-4" />
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full mb-4 text-sm">
            Still have questions?
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">We're here to help</h3>
          <p className="text-gray-600 max-w-xl mx-auto mb-6">
            Contact our support team for any additional questions about VoteChain
          </p>
          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white border border-blue-200 text-blue-600 font-medium px-6 py-3 rounded-lg hover:shadow-md transition-all"
            >
              Contact Support
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium px-6 py-3 rounded-lg hover:shadow-md transition-all"
            >
              Join Community
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}