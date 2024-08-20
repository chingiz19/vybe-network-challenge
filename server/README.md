# Backend - Node API

This backend service is a Node.js server deployed using Docker. It interacts with the Solana blockchain to fetch real-time data and provides an API for the frontend application. The API delivers three specific metrics: MarketCapDistribution, TransactionsPerSecond, and WalletBalance.

## Requirements

- Node.js: The server is built using Node.js and TypeScript, offering robust, scalable, and maintainable code.
- Docker [optional]: The entire backend is containerized using Docker, ensuring consistent and reproducible environments across different systems.
- Solana Blockchain: The server interacts with the Solana blockchain through the public RPC endpoint https://solana-mainnet.rpc.extrnode.com/.

## API Endpoints

1. MarketCapDistribution

- Description: Fetches data for five of your most bullish SPL tokens. For each token, the API retrieves the current supply and uses a price API to calculate the market cap.
- Endpoint: /api/analytics/marketCapDistribution
- Method: GET
- Response: Returns an array of tokens with their corresponding market cap in USD.

2. TransactionsPerSecond

- Description: Fetches the Solana transactions-per-second (TPS) metric from the RPC over time, producing a timeseries dataset. The timeframe is optimized based on data availability and server load considerations.
- Endpoint: /api/analytics/transactionsPerSecond
- Method: GET
- Response: Returns a timeseries dataset of TPS metrics.

3. WalletBalance

- Description: Fetches the balances of a list of 10 wallets and formats the data to be displayed on a bar chart.
- Endpoint: /api/analytics/walletBalance
- Method: GET
- Response: Returns an array of wallet balances in both SOL and USD.

## Environment Variables

Ensure that you add the following API keys and environment variables in the .env file in the this directory:

```bash
EXTRNODE_API_KEY: Your API key for accessing the Solana RPC endpoint (https://extrnode.com/).
```

Note: Occasionally, too many requests may result in rate limiting or errors from the CoinGecko API.

## Further Considerations

- Rate Limiting: The CoinGecko API may occasionally return errors due to rate limiting. Consider implementing retry logic or caching mechanisms to handle this.
- Optimization: Ensure the server is optimized for handling large amounts of data, especially when interacting with blockchain endpoints.

## Setup and Installation

1. **Install Dependencies**: `npm install`
2. **Run the Development Server**: `npm run dev`
