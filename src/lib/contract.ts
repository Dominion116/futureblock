export const PREDICTION_MARKET_ADDRESS = "0xF8342b4d5D0aAda93C1cFf54A93f81c78d78CE09" as const;

export const PREDICTION_MARKET_ABI = [
  { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "user", "type": "address" },
      { "indexed": false, "internalType": "bytes32", "name": "commitment", "type": "bytes32" }
    ],
    "name": "PredictionCommitted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "bytes32", "name": "commitment", "type": "bytes32" },
      { "indexed": false, "internalType": "enum PredictionMarket.PredictionResult", "name": "result", "type": "uint8" }
    ],
    "name": "PredictionOutcome",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "user", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "token", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "predictedPrice", "type": "uint256" },
      { "indexed": false, "internalType": "enum PredictionMarket.PredictionChoice", "name": "choice", "type": "uint8" },
      { "indexed": false, "internalType": "uint256", "name": "targetTimestamp", "type": "uint256" }
    ],
    "name": "PredictionRevealed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "token", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "priceFeed", "type": "address" }
    ],
    "name": "PriceFeedSet",
    "type": "event"
  },
  { "inputs": [ { "internalType": "bytes32", "name": "_commitment", "type": "bytes32" } ], "name": "checkPrice", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [ { "internalType": "bytes32", "name": "_commitment", "type": "bytes32" } ], "name": "commit", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "commitments", "outputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" },
  { "inputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "name": "predictions", "outputs": [ { "internalType": "address", "name": "user", "type": "address" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "predictedPrice", "type": "uint256" }, { "internalType": "uint256", "name": "targetTimestamp", "type": "uint256" }, { "internalType": "enum PredictionMarket.PredictionChoice", "name": "choice", "type": "uint8" }, { "internalType": "enum PredictionMarket.PredictionResult", "name": "result", "type": "uint8" }, { "internalType": "bool", "name": "revealed", "type": "bool" } ], "stateMutability": "view", "type": "function" },
  { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "priceFeeds", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" },
  { "inputs": [ { "internalType": "address", "name": "_token", "type": "address" }, { "internalType": "uint256", "name": "_predictedPrice", "type": "uint256" }, { "internalType": "enum PredictionMarket.PredictionChoice", "name": "_choice", "type": "uint8" }, { "internalType": "uint256", "name": "_targetTimestamp", "type": "uint256" }, { "internalType": "bytes32", "name": "_salt", "type": "bytes32" } ], "name": "reveal", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [ { "internalType": "address", "name": "_token", "type": "address" }, { "internalType": "address", "name": "_priceFeed", "type": "address" } ], "name": "setPriceFeed", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
];

export type PredictionChoice = 0 | 1 | 2; // up/down/exact (guess based on enum)
export type PredictionResult = 0 | 1 | 2; // pending/won/lost (guess based on enum)

