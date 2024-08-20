import { Connection, PublicKey } from "@solana/web3.js";
import { getEnv } from "../config";
import Timeseries from "../lib/TimeSeries";
import { logger } from "../infrastucture";

// Safely retrieve the API key
const apiKey = getEnv("EXTRNODE_API_KEY");

// Create a connection to the Solana mainnet using the provided RPC endpoint
const connection = new Connection(
  `https://solana-mainnet.rpc.extrnode.com/${apiKey}`,
  "confirmed",
);

/** Gets the balance of a given wallet in lamports */
export const getBalance = async (address: string) => {
  try {
    const publicKey = new PublicKey(address);
    const balance = await connection.getBalance(publicKey);
    return balance;
  } catch (error) {
    logger.error("Error fetching balance:", error);
    throw new Error("Could not fetch balance");
  }
};

/**
 * Calculates the TPS by averaging over a specified number of recent performance samples.
 * @param {number} [numOfSamples=5] - The number of recent performance samples to average. Defaults to 5.
 */
export const getTransactionsPerSecond = async (numOfSamples: number = 5) => {
  try {
    const samples = await connection.getRecentPerformanceSamples(numOfSamples);

    if (samples.length === 0) {
      throw new Error("No performance samples available");
    }

    const tpsSum = samples.reduce(
      (agg, sample) => agg + (sample.numTransactions / sample.samplePeriodSecs),
      0,
    );

    const averageTps = Math.round(tpsSum / samples.length);

    return averageTps;
  } catch (error) {
    logger.error("Error fetching TPS:", error);
    throw error;
  }
};

/**
 * Fetches the current supply of a given SPL token.
 *
 * Note: Calculating the actual circulating supply of a given SPL token on Solana
 * without explicitly knowing the list of locked or burned accounts is challenging
 * because the circulating supply is typically defined as the total supply minus the tokens that are either locked, reserved, or burned.
 * However, if you don’t have a predefined list of these non-circulating accounts,
 * you might need to use some heuristics or external data to estimate the circulating supply.
 */
export const getTokenSupply = async (mintAddress: string) => {
  try {
    const mintPublicKey = new PublicKey(mintAddress);
    const mintInfo = await connection.getTokenSupply(mintPublicKey);
    return mintInfo.value.uiAmount;
  } catch (error) {
    logger.error("Error fetching token supply:", error);
    throw error;
  }
};

export const tpsTimeSeries = new Timeseries<number>({
  readySize: 15,
  intervalInSeconds: 10,
});
tpsTimeSeries.setSource(getTransactionsPerSecond);
