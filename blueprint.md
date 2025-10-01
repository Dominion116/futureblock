# Project Overview

This project is a decentralized prediction market application. Users can predict the future price of a token at a specific time. The application is designed to be transparent and fair, using a commit-reveal scheme to prevent front-running and ensure honest competition.

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

The current goal is to enhance the smart contract with price checking and win/loss determination logic.

## Steps:
1.  **Update `PredictionMarket.sol`:** Modify the existing Solidity smart contract.
2.  **Integrate Chainlink:** Import the `AggregatorV3Interface` to fetch price data.
3.  **Add PredictionChoice:** Create an enum to represent `High` and `Low` prediction choices.
4.  **Add PredictionResult:** Create an enum to track the state of a prediction (`Pending`, `Won`, `Lost`).
5.  **Update `Prediction` Struct:** Add fields for the user's choice and the result of the prediction.
6.  **Modify `reveal` function:** Include the `PredictionChoice` as a parameter.
7.  **Implement `checkPrice` function:** This function will:
    *   Be callable after 24 hours.
    *   Fetch the current price from a Chainlink data feed.
    *   Compare the current price to the predicted price.
    *   Determine if the user won or lost based on their `PredictionChoice`.
    *   Update the prediction's result.
    *   Emit a `PredictionOutcome` event.
