import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { ethers } from 'ethers';

// --- Contract Details ---
const contractAddress = '0xf8342b4d5d0aada93c1cff54a93f81c78d78ce09';
const contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"bytes32","name":"commitment","type":"bytes32"}],"name":"PredictionCommitted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"commitment","type":"bytes32"},{"indexed":false,"internalType":"enum PredictionMarket.PredictionResult","name":"result","type":"uint8"}],"name":"PredictionOutcome","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"predictedPrice","type":"uint256"},{"indexed":false,"internalType":"enum PredictionMarket.PredictionChoice","name":"choice","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"targetTimestamp","type":"uint256"}],"name":"PredictionRevealed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":true,"internalType":"address","name":"priceFeed","type":"address"}],"name":"PriceFeedSet","type":"event"},{"inputs":[{"internalType":"bytes32","name":"_commitment","type":"bytes32"}],"name":"checkPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_commitment","type":"bytes32"}],"name":"commit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"commitments","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"predictions","outputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"predictedPrice","type":"uint256"},{"internalType":"uint256","name":"targetTimestamp","type":"uint256"},{"internalType":"enum PredictionMarket.PredictionChoice","name":"choice","type":"uint8"},{"internalType":"enum PredictionMarket.PredictionResult","name":"result","type":"uint8"},{"internalType":"bool","name":"revealed","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"priceFeeds","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_predictedPrice","type":"uint256"},{"internalType":"enum PredictionMarket.PredictionChoice","name":"_choice","type":"uint8"},{"internalType":"uint256","name":"_targetTimestamp","type":"uint256"},{"internalType":"bytes32","name":"_salt","type":"bytes32"}],"name":"reveal","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_priceFeed","type":"address"}],"name":"setPriceFeed","outputs":[],"stateMutability":"nonpayable","type":"function"}];

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface Prediction {
  commitment: string;
  tokenAddress: string;
  predictedPrice: ethers.BigNumber;
  choice: number;
  targetTimestamp: number;
  salt: ethers.BytesLike;
  revealed: boolean;
  outcome: number; // 0: Pending, 1: Won, 2: Lost
}

const AppPage: NextPage = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [predictions, setPredictions] = useState<Prediction[]>([]);

  // Prediction State
  const [token, setToken] = useState('ETH');
  const [price, setPrice] = useState('');
  const [choice, setChoice] = useState(0); // 0 for High, 1 for Low
  const [datetime, setDatetime] = useState('');

  useEffect(() => {
    if (account) {
      loadPredictions();
      listenToEvents();
    }
  }, [account, contract]);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const newProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(newProvider);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        const signer = newProvider.getSigner();
        const newContract = new ethers.Contract(contractAddress, contractABI, signer);
        setContract(newContract);
      } catch (error) {
        console.error("Error connecting to MetaMask", error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  const loadPredictions = () => {
    const loadedPredictions: Prediction[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('0x')) { // A simple check for commitment hash
        const storedPrediction = JSON.parse(localStorage.getItem(key)!);
        loadedPredictions.push({ commitment: key, ...storedPrediction });
      }
    }
    setPredictions(loadedPredictions);
  };

  const listenToEvents = () => {
    if (!contract) return;

    contract.on('PredictionRevealed', (user, commitment) => {
        if (user.toLowerCase() === account?.toLowerCase()) {
            updatePredictionStatus(commitment, { revealed: true });
        }
    });

    contract.on('PredictionOutcome', (commitment, result) => {
        updatePredictionStatus(commitment, { outcome: result });
    });
  };

  const updatePredictionStatus = (commitment: string, newStatus: Partial<Prediction>) => {
    setPredictions(prev => prev.map(p => p.commitment === commitment ? { ...p, ...newStatus } : p));
    const stored = JSON.parse(localStorage.getItem(commitment)!);
    localStorage.setItem(commitment, JSON.stringify({ ...stored, ...newStatus }));
  };

  const handleCommit = async () => {
    if (!contract || !account) return;

    const tokenAddress = getTokenAddress(token);
    const predictedPrice = ethers.utils.parseUnits(price, 18);
    const targetTimestamp = Math.floor(new Date(datetime).getTime() / 1000);
    const salt = ethers.utils.randomBytes(32);

    try {
      const commitment = ethers.utils.solidityKeccak256(
        ['address', 'address', 'uint256', 'uint8', 'uint256', 'bytes32'],
        [account, tokenAddress, predictedPrice, choice, targetTimestamp, salt]
      );

      const tx = await contract.commit(commitment);
      await tx.wait();

      const newPrediction: Prediction = { commitment, tokenAddress, predictedPrice, choice, targetTimestamp, salt, revealed: false, outcome: 0 };
      localStorage.setItem(commitment, JSON.stringify(newPrediction));
      setPredictions(prev => [...prev, newPrediction]);
      
      alert('Prediction Committed!');
    } catch (error) {
      console.error('Error committing prediction:', error);
    }
  };

  const handleReveal = async (commitment: string) => {
    if (!contract) return;

    const pred = predictions.find(p => p.commitment === commitment);
    if (!pred) return;

    try {
        const tx = await contract.reveal(pred.tokenAddress, pred.predictedPrice, pred.choice, pred.targetTimestamp, pred.salt);
        await tx.wait();
        alert('Prediction Revealed!');
    } catch (error) {
        console.error("Error revealing prediction:", error);
    }
  };

  const handleCheckPrice = async (commitment: string) => {
      if (!contract) return;
      try {
          const tx = await contract.checkPrice(commitment);
          await tx.wait();
          alert('Price check initiated!');
      } catch (error) {
          console.error("Error checking price:", error);
      }
  };

  const getTokenAddress = (tokenSymbol: string) => {
    switch (tokenSymbol) {
      case 'ETH': return '0x4200000000000000000000000000000000000006';
      case 'BTC': return '0x1ceA84203673764245E35E2154A8563D2574A049';
      case 'SOL': return '0x9943264c7216fC317136002FE4a22874284d5289';
      default: throw new Error('Invalid token symbol');
    }
  };

  const getOutcomeText = (outcome: number) => {
      switch(outcome) {
          case 1: return 'Won';
          case 2: return 'Lost';
          default: return 'Pending';
      }
  }

  return (
    <div className="container">
      <Head>
        <title>FutureBlock App</title>
        <meta name="description" content="Prediction Market Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <header className="header">
          <h1 className="title">FutureBlock</h1>
          <div className="wallet-section">
            {account ? (
              <p className="wallet-address">Connected: {`${account.substring(0, 6)}...${account.substring(account.length - 4)}`}</p>
            ) : (
              <button className="connect-button" onClick={connectWallet}>
                Connect Wallet
              </button>
            )}
          </div>
        </header>

        {account && (
          <>
            <div className="prediction-section">
              <h2>Make a Prediction</h2>
              <div className="form-group">
                <label>Token</label>
                <select value={token} onChange={(e) => setToken(e.target.value)}>
                  <option>ETH</option>
                  <option>BTC</option>
                  <option>SOL</option>
                </select>
              </div>
              <div className="form-group">
                <label>Predicted Price (USD)</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Choice</label>
                <div className="choice-buttons">
                  <button className={choice === 0 ? 'active' : ''} onClick={() => setChoice(0)}>High</button>
                  <button className={choice === 1 ? 'active' : ''} onClick={() => setChoice(1)}>Low</button>
                </div>
              </div>
              <div className="form-group">
                <label>Target Date and Time</label>
                <input type="datetime-local" value={datetime} onChange={(e) => setDatetime(e.target.value)} />
              </div>
              <button className="commit-button" onClick={handleCommit}>Commit Prediction</button>
            </div>

            <div className="my-predictions-section">
                <h2>My Predictions</h2>
                <div className="predictions-list">
                    {predictions.map(p => (
                        <div key={p.commitment} className="prediction-card">
                            <p>Token: {Object.keys(getTokenAddress).find(key => getTokenAddress(key as any) === p.tokenAddress)}</p>
                            <p>Predicted Price: ${ethers.utils.formatUnits(p.predictedPrice, 18)}</p>
                            <p>Choice: {p.choice === 0 ? 'High' : 'Low'}</p>
                            <p>Target: {new Date(p.targetTimestamp * 1000).toLocaleString()}</p>
                            <p>Status: {p.revealed ? `Revealed (${getOutcomeText(p.outcome)})` : 'Committed'}</p>
                            {!p.revealed && <button onClick={() => handleReveal(p.commitment)}>Reveal</button>}
                            {p.revealed && p.outcome === 0 && p.targetTimestamp < Date.now() / 1000 && <button onClick={() => handleCheckPrice(p.commitment)}>Check Price</button>}
                        </div>
                    ))}
                </div>
            </div>
          </>
        )}

      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: #1a1a1a;
          color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        }

        .main {
          flex: 1;
          padding: 2rem;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 2rem;
          border-bottom: 1px solid #333;
        }
        
        .title {
          margin: 0;
          font-size: 2.5rem;
        }

        .wallet-address {
          font-size: 1rem;
          background-color: #2a2a2a;
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
        }

        .connect-button, .commit-button, .prediction-card button {
          padding: 0.8rem 1.5rem;
          font-size: 1rem;
          color: #ffffff;
          background-color: #0070f3;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .connect-button:hover, .commit-button:hover, .prediction-card button:hover {
          background-color: #0056b3;
        }

        .prediction-section, .my-predictions-section {
          padding: 2rem 0;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
        }

        .form-group input, .form-group select {
          width: 100%;
          padding: 0.8rem;
          font-size: 1rem;
          border-radius: 8px;
          border: 1px solid #333;
          background-color: #2a2a2a;
          color: #ffffff;
        }

        .choice-buttons button {
          padding: 0.8rem 1.5rem;
          font-size: 1rem;
          color: #ffffff;
          background-color: #333;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          margin-right: 1rem;
        }

        .choice-buttons button.active {
          background-color: #0070f3;
        }

        .predictions-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1rem;
        }

        .prediction-card {
            background-color: #2a2a2a;
            padding: 1.5rem;
            border-radius: 8px;
            border: 1px solid #333;
        }

        .prediction-card p {
            margin: 0 0 1rem 0;
        }
        
      `}</style>
    </div>
  );
};

export default AppPage;
