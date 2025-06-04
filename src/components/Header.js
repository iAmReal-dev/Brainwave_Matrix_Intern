import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ConnectWallet from './ConnectWallet';

export default function Header({ account, onConnect, onDisconnect }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Menu animation variants
  const menuVariants = {
    hidden: { opacity: 0, height: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    visible: { opacity: 1, height: 'auto', transition: { duration: 0.3, ease: "easeInOut" } },
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-4 shadow-lg">
      <div className="container mx-auto flex flex-wrap md:flex-nowrap justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link className="flex items-center gap-2" to="/">
          <div className="bg-white p-2 rounded-full">
            <div className="bg-gray-200 border-2 border-dashed  w-5 h-5"></div>
          </div>
          <h1 className="text-2xl font-bold">VoteChain</h1>
          </Link>
        </div>

        {/* Hamburger button for mobile */}
        <button
          className="md:hidden flex items-center px-3 py-2 border rounded text-white border-white hover:text-gray-300 hover:border-gray-300"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <svg
            className="fill-current h-5 w-5"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              // Close icon
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            ) : (
              // Hamburger icon
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            )}
          </svg>
        </button>

        {/* Navigation links */}
        <AnimatePresence initial={false}>
          {(isMenuOpen || window.innerWidth >= 768) && (
            <motion.nav
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={menuVariants}
              className={`w-full md:flex md:items-center md:w-auto`}
            >
              <div className="flex flex-col md:flex-row md:space-x-4 mt-4 md:mt-0">
                <Link
                  to="/"
                  className="text-white hover:text-gray-200 transition-all duration-200 px-3 pt-3"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/faq"
                  className="text-white hover:text-gray-200 transition-all duration-200 px-3 pt-3"
                  onClick={() => setIsMenuOpen(false)}
                >
                  FAQ
                </Link>
                <div className="px-3 py-2">
                  <ConnectWallet
                    account={account}
                    onConnect={onConnect}
                    onDisconnect={onDisconnect}
                  />
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
