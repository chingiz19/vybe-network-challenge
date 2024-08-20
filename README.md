# Solana Blockchain Analytics Dashboard

This project is a full-stack application designed to provide real-time analytics from the Solana blockchain. The project consists of two main components: a frontend client built with React, TypeScript, and Vite, and a backend server built with Node.js and Docker. The application fetches and displays key blockchain metrics, including market cap distribution of SPL tokens, Solana transactions per second (TPS), and wallet balances.

## Project Overview

This project was developed as part of a challenge to build an analytics dashboard that interacts with the Solana blockchain. The primary goals of the project are to:

- Fetch and display blockchain data: The backend interacts with the Solana blockchain through the public RPC endpoint and provides real-time data to the frontend.
- Visualize data using charts: The frontend application displays the data using various chart types, including pie charts, time series charts, and bar charts.
- Deploy the application in a containerized environment: The backend server is deployed using Docker, ensuring consistency and ease of deployment across different environments.

## Project Structure

- client/: Contains the frontend application built with React, TypeScript, and Vite. It fetches data from the backend and displays it using charts.
- server/: Contains the backend server built with Node.js. It interacts with the Solana blockchain and provides data to the frontend via a RESTful API.

## Getting Started

Clone the Repository

```bash
git clone https://github.com/chingiz19/vybenetwork.git
cd vybenetwork
```

Each subdirectory contains a README.md file with specific instructions for setting up and running the respective parts of the application:

- [Client](./client/README.md) README
- [Server](./server/README.md) README

Instructions for running the client and server can be found in their respective README.md files. Typically, you’ll run the backend server first, followed by the frontend client.

To concurrently run both the frontend and backend applications for development purposes, use the following command: `npm run dev`.

## Deployment

### 1. Start locally

```bash
npm run start
```

### 2. Start with Docker

```bash
npm run docker
```
