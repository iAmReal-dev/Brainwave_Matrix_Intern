import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ethers } from 'ethers';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import AddCandidate from './components/AddCandidate';
import CandidateList from './components/CandidateList';
import Spinner from './components/Spinner';
import SkeletonCard from './components/SkeletonCard';
import FAQ from './components/FAQ';
import { contractAddress, contractABI } from './contractConfig';

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const SEPOLIA_CHAIN_ID = '0xaa36a7'; // Sepolia chainId in hex

  const handleConnect = useCallback(async (newAccount) => {
    try {
      setLoading(true);
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId !== SEPOLIA_CHAIN_ID) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: SEPOLIA_CHAIN_ID }],
          });
        } catch (switchError) {
          if (switchError.code === 4902) {
            toast.error('Please add Sepolia network to MetaMask');
          }
          throw switchError;
        }
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider);
      const signer = await provider.getSigner();
      setSigner(signer);
      setAccount(newAccount);

      const votingContract = new ethers.Contract(contractAddress, contractABI, signer);
      setContract(votingContract);

      const owner = await votingContract.owner();
      setIsOwner(newAccount.toLowerCase() === owner.toLowerCase());

      const candidateCount = await votingContract.getTotalCandidates();
      const candidatesList = [];
      for (let i = 1; i <= Number(candidateCount); i++) {
        const candidate = await votingContract.getCandidate(i);
        candidatesList.push({
          id: Number(candidate[0]),
          name: candidate[1],
          voteCount: Number(candidate[2])
        });
      }
      setCandidates(candidatesList);
      setInitialLoad(false);
    } catch (error) {
      console.error('Error connecting:', error);
      toast.error('Failed to connect: ' + error.message);
      setAccount(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDisconnect = useCallback(() => {
    setAccount(null);
    setSigner(null);
    setContract(null);
    setProvider(null);
    setIsOwner(false);
    setCandidates([]);
    setInitialLoad(true);
    toast.success('Wallet disconnected');
  }, []);

  useEffect(() => {
    if (!window.ethereum) {
      toast.error('Please install MetaMask!');
      setInitialLoad(false);
      return;
    }

    const handleAccountsChanged = (accounts) => {
      console.log('Accounts changed:', accounts);
      if (accounts.length > 0 && accounts[0] !== account && account !== null) {
        handleConnect(accounts[0]);
      } else if (accounts.length === 0 && account !== null) {
        handleDisconnect();
      }
    };

    const handleChainChanged = (chainId) => {
      console.log('Chain changed to:', chainId);
      if (chainId !== SEPOLIA_CHAIN_ID) {
        toast.error('Please switch to Sepolia network');
        handleDisconnect();
      } else if (account !== null) {
        window.ethereum.request({ method: 'eth_accounts' }).then(accounts => {
          if (accounts.length > 0 && accounts[0] !== account) {
            handleConnect(accounts[0]);
          }
        });
      }
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    const init = async () => {
      try {
        setLoading(true);
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        if (chainId !== SEPOLIA_CHAIN_ID) {
          setInitialLoad(false);
          toast.error('Please switch to Sepolia network');
          return;
        }
        setInitialLoad(false);
      } catch (error) {
        console.error('Error initializing app:', error);
        toast.error('Initialization failed: ' + error.message);
      } finally {
        setLoading(false);
      }
    };
    init();

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, [handleConnect, handleDisconnect, account]);

  const handleVote = async (candidateId) => {
    if (!contract || !signer) {
      toast.error('Please connect your wallet first');
      return;
    }
    try {
      setLoading(true);
      const tx = await contract.vote(candidateId, { gasLimit: 300000 });
      toast.promise(tx.wait(), {
        loading: 'Processing your vote...',
        success: <b>Vote recorded successfully!</b>,
        error: <b>Error processing vote</b>,
      });
      await tx.wait();
      const updatedCandidate = await contract.getCandidate(candidateId);
      setCandidates(candidates.map(c =>
        c.id === candidateId ? { ...c, voteCount: Number(updatedCandidate[2]) } : c
      ));
    } catch (error) {
      console.error('Error voting:', error);
      toast.error('Voting failed: ' + (error.reason || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleAddCandidate = async (name) => {
    if (!contract || !signer) {
      toast.error('Please connect your wallet first');
      return;
    }
    try {
      setLoading(true);
      const tx = await contract.addCandidate(name);
      toast.promise(tx.wait(), {
        loading: 'Adding candidate...',
        success: <b>Candidate added successfully!</b>,
        error: <b>Error adding candidate</b>,
      });
      await tx.wait();
      const candidateCount = await contract.getTotalCandidates();
      const newCandidate = await contract.getCandidate(candidateCount);
      setCandidates([...candidates, {
        id: Number(newCandidate[0]),
        name: newCandidate[1],
        voteCount: Number(newCandidate[2])
      }]);
    } catch (error) {
      console.error('Error adding candidate:', error);
      toast.error('Failed to add candidate: ' + (error.reason || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Toaster position="top-right" />
        <Header account={account} onConnect={handleConnect} onDisconnect={handleDisconnect} />
        <Routes>
          <Route
            path="/"
            element={
              <main className="container mx-auto px-4 py-8 max-w-6xl">
                {loading && <Spinner />}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center mb-10"
                >
                  <h1 className="text-4xl md:h-14 mb-4 md:m-0 md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-700 ">
                    Decentralized Voting Platform
                  </h1>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Vote securely on the blockchain. Each vote is recorded permanently and transparently.
                  </p>
                </motion.div>
                <div className="flex flex-col items-center">
                  {isOwner && <AddCandidate onAddCandidate={handleAddCandidate} />}
                  {initialLoad ? (
                    <div className="w-full max-w-4xl">
                      <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                          <SkeletonCard key={i} />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <CandidateList candidates={candidates} onVote={handleVote} />
                  )}
                </div>
              </main>
            }
          />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
        <footer className="bg-white border-t mt-12 py-6 text-center text-gray-500">
          <p>© {new Date().getFullYear()} VoteChain - Secure Blockchain Voting</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;