# Client Directory - React + TypeScript + Vite

This project is a frontend application built using React, TypeScript, and Vite. It is designed to display data fetched from a backend service using various types of charts. The application leverages modern web development practices, including the use of Tailwind CSS for styling and ApexCharts for data visualization.

### Overview

This repository provides a minimal setup to get React working with Vite, featuring Hot Module Replacement (HMR) and some basic ESLint rules for maintaining code quality. The frontend fetches data from a backend service and presents it using three different types of charts.

Technologies Used

    •	React: A popular JavaScript library for building user interfaces.
    •	TypeScript: A strongly typed programming language that builds on JavaScript, providing better tooling and error-checking.
    •	Vite: A fast build tool and development server that provides an instant HMR experience.
    •	Tailwind CSS: A utility-first CSS framework that allows for rapid UI development without leaving your HTML.
    •	ApexCharts: A modern charting library used to create various data visualizations.

• Jest: A JavaScript testing framework designed to ensure correctness of any JavaScript codebase.
• React Testing Library: A testing library built on top of Jest, focused on testing React components in a way that resembles how they are used in the real world.
• ts-jest: A TypeScript preprocessor for Jest, enabling seamless testing in TypeScript projects.

### Features

1. Pie Chart
   • Purpose: Represents the market cap distribution of five chosen SPL tokens.
   • Library: Implemented using ApexCharts.
   • Data Source: Fetched from the backend and visualized to show each token’s market cap.

2. Time Series Chart
   • Purpose: Displays the Solana transactions per second (TPS) metric over time.
   • Library: Implemented using ApexCharts.
   • Data Source: Time series data fetched from the backend, providing an overview of Solana’s performance.

3. Bar Chart
   • Purpose: Shows the SOL balances of 10 randomly chosen wallets from Vybe Network's [rich list](https://alpha.vybenetwork.com/tokens/richlist).
   • Library: Implemented using ApexCharts.
   • Data Source: The wallet addresses are either selected randomly or based on specific interest.

### Tailwind CSS Usage

Tailwind CSS was chosen for this project due to its utility-first approach, which allows for rapid styling directly within the markup. This methodology is particularly beneficial in small to medium-sized projects where development speed is a priority.

Benefits:

    •	Consistency: Enforces consistent spacing, typography, and color usage across components.
    •	Efficiency: Reduces the need for context switching between HTML and CSS, allowing for quicker UI iterations.
    •	Responsive Design: Simplifies the creation of responsive layouts with its built-in utilities.

### Further Improvements

There are numerous enhancements that could be made to this project, but due to time constraints, only the essential features have been implemented. Future improvements could include more detailed documentation, additional test coverage, and further optimization (responsiveness, look and feel etc.) of the codebase.

## Setup and Installation

1. **Install Dependencies**: `npm install`
2. **Run the Development Server**: `npm run dev`
3. **Run tests**: `npm test`
4. **Build for Production**: `npm run build`
