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
- **PredictionChoice Enum:** `High` and `Low` options for predictions.
- **PredictionResult Enum:** `Pending`, `Won`, and `Lost` to track the outcome of a prediction.
- **Commit Function:** `commit(bytes32 _commitment)` allows users to submit a hash of their prediction.
- **Reveal Function:** `reveal(address _token, uint256 _predictedPrice, PredictionChoice _choice, uint256 _targetTimestamp, bytes32 _salt)` allows users to reveal their prediction after the commitment phase.
- **CheckPrice Function:** `checkPrice(bytes32 _commitment, address _priceFeed)` allows anyone to trigger the price check and determine the winner after 24 hours.
- **Events:** Emits `PredictionCommitted`, `PredictionRevealed`, and `PredictionOutcome` for off-chain services to track.

# Current Plan

The current goal is to refactor the contract to manage oracle addresses internally, making it more secure and user-friendly.

## Steps:
1.  **Add Owner and Modifier:** Introduce an `owner` variable, a `constructor` to set the owner, and an `onlyOwner` modifier for access control.
2.  **Add Price Feed Mapping:** Create a `mapping(address => address)` named `priceFeeds` to store the approved oracle address for each token.
3.  **Create `setPriceFeed` Function:** Implement an `onlyOwner` function that allows the contract owner to add or update the price feed address for a specific token.
4.  **Refactor `checkPrice`:** Modify the function to remove the `_priceFeed` argument. It will now automatically look up the correct oracle address from the `priceFeeds` mapping based on the token address associated with the prediction.
