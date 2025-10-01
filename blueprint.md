# Project Overview

This project is a decentralized prediction market application. Users can predict the future price of a token at a specific time. The application is designed to be transparent and fair, using a commit-reveal scheme to prevent front-running and honest competition.

# Implemented Features

## Core Functionality
- **Prediction Market:** A system where users can submit predictions about token prices.
- **Commit-Reveal Scheme:** A two-step process for submitting predictions to ensure fairness. Users first commit a hash of their prediction and then reveal it later.
- **Price Check:** After a 24-hour period, the contract can check the price of the token using a Chainlink oracle.
- **Win/Loss Logic:** The contract determines if the user has won or lost their prediction based on whether they chose "high" or "low" and the actual price movement.

## Smart Contract (`PredictionMarket.sol`)
- **Solidity Version:** Uses `^0.8.20`.
- **Chainlink Integration:** Imports `AggregatorV3Interface.sol` to fetch token prices.
- **Pre-configured Oracles:** The contract is pre-configured on deployment with the Chainlink price feed addresses for ETH, BTC, and SOL on the Base mainnet.
- **Owner-Managed Oracles:** The contract owner can add or update price feed oracles for any token using the `setPriceFeed` function.
- **PredictionChoice Enum:** `High` and `Low` options for predictions.
- **PredictionResult Enum:** `Pending`, `Won`, and `Lost` to track the outcome of a prediction.
- **Commit Function:** `commit(bytes32 _commitment)` allows users to submit a hash of their prediction.
- **Reveal Function:** `reveal(address _token, uint256 _predictedPrice, PredictionChoice _choice, uint256 _targetTimestamp, bytes32 _salt)` allows users to reveal their prediction after the commitment phase.
- **CheckPrice Function:** `checkPrice(bytes32 _commitment)` allows anyone to trigger the price check and determine the winner after 24 hours.
- **Events:** Emits `PredictionCommitted`, `PredictionRevealed`, `PredictionOutcome`, and `PriceFeedSet` for off-chain services to track.

# Current Plan

The current goal is to pre-configure the smart contract with the necessary price feed addresses for popular cryptocurrencies, making it ready for immediate use upon deployment.

## Steps:
1.  **Update Constructor:** Modify the contract's `constructor` to set the initial price feed addresses.
2.  **Add ETH, BTC, SOL:** In the constructor, populate the `priceFeeds` mapping with the official token and oracle addresses for ETH, BTC, and SOL on the Base mainnet.
