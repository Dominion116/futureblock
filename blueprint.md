# Project Overview

This project is a decentralized prediction market application. Users can predict the future price of a token at a specific time. The application is designed to be transparent and fair, using a commit-reveal scheme to prevent front-running and honest competition.

# Implemented Features

## Smart Contract (`PredictionMarket.sol`)
- **Solidity Version:** Uses `^0.8.20`.
- **Chainlink Integration:** Imports `AggregatorV3Interface.sol` to fetch token prices.
- **Pre-configured Oracles:** The contract is pre-configured on deployment with the Chainlink price feed addresses for ETH, BTC, and SOL on the Base mainnet.
- **Owner-Managed Oracles:** The contract owner can add or update price feed oracles for any token using the `setPriceFeed` function.
- **PredictionChoice Enum:** `High` and `Low` options for predictions.
- **PredictionResult Enum:** `Pending`, `Won`, and `Lost` to track the outcome of a prediction.
- **Commit-Reveal Scheme:** A two-step process for submitting predictions to ensure fairness.

# Current Plan

The current goal is to build a user-friendly frontend for the prediction market application, starting with a dedicated landing page inspired by Uniswap's dark mode UI.

## Steps:
1.  **Restructure Pages:** Rename the existing `index.tsx` to `app.tsx` to serve as the main application page. Create a new `index.tsx` to act as the project's landing page.
2.  **Design Landing Page:** Create a landing page with a hero section, an explanation of the commit-reveal process, and a showcase of the application's features.
3.  **Apply Uniswap-Style UI:** Implement a dark theme with a modern, clean aesthetic, focusing on typography and user experience.
4.  **Add Navigation:** Include a "Launch App" button on the landing page that directs users to the main prediction application.
