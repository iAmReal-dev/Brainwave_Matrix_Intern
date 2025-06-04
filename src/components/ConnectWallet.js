import React from 'react';
import { FaWallet } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function ConnectWallet({ account, onConnect, onDisconnect }) {
  const handleConnect = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
          onConnect(accounts[0]);
        }
      } else {
        toast.error('No wallet detected. Please install MetaMask');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast.error('Failed to connect wallet: ' + error.message);
    }
  };

  const handleDisconnect = () => {
    onDisconnect();
    // toast.success('Wallet disconnected');
  };

  return (
    <div className="flex items-center">
      {account ? (
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-md">
            <FaWallet className="text-blue-500" />
            <span className="font-mono text-sm">
              {account.slice(0, 6)}...{account.slice(-4)}
            </span>
          </div>
          <button
            onClick={handleDisconnect}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-200 text-sm font-semibold"
          >
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <button
          onClick={handleConnect}
          className="flex items-center space-x-2 bg-white/20 backdrop-blur-md hover:bg-blue-100/30 rounded-md transition-all duration-200 px-4 py-2 text-sm font-semibold"
        >
          <FaWallet />
          <span>Connect Wallet</span>
        </button>
      )}
    </div>
  );
}