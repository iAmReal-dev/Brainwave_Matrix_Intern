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
              <div className="bg-gray-200 border-2 border-dashed w-5 h-5"></div>
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
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            ) : (
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
              className="w-full md:flex md:items-center md:w-auto"
            >
              <div className="flex flex-col md:flex-row md:space-x-4 mt-4 md:mt-0 items-center">
                <Link
                  to="/"
                  className="text-white hover:text-gray-200 transition-all duration-200 px-3 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/faq"
                  className="text-white hover:text-gray-200 transition-all duration-200 px-3 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  FAQ
                </Link>
                <a
                  href="https://github.com/iAmReal-dev/Brainwave_Matrix_Intern"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-200 transition-all duration-200 px-3 py-2"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="GitHub Repository"
                >
                  <svg
                    className="w-6 h-6 fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </a>
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