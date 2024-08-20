import { CoinGecko, Solana } from "../../services";
import { LAMPORTS_PER_SOL, tokens, walletAddresses } from "../../constants";
import { ErrorResponse, SuccessResponse } from "../types";

export const getMarketCapDistribution = async () => {
  const marketCaps = [];

  const tokenIds = tokens.map((token) => token.tokenId);
  const tokenPricesInUSD = await CoinGecko.getPricesInUSD(tokenIds);

  for (const token of tokens) {
    const supply = await Solana.getTokenSupply(token.mintAddress);
    const price = tokenPricesInUSD[token.tokenId];

    if (price && supply) {
      const marketCapInUSD = supply * price;
      marketCaps.push({ name: token.name, marketCapInUSD });
    }
  }

  return new SuccessResponse(marketCaps);
};

export const getWalletBalance = async () => {
  const wallets = [];

  const solPriceInUSD = await CoinGecko.getSolPriceInUSD();

  if (!solPriceInUSD) {
    throw new Error("Failed to get sol price in USD");
  }

  for (const walletAddress of walletAddresses) {
    const balanceLamports = await Solana.getBalance(walletAddress);
    const balanceSOL = balanceLamports / LAMPORTS_PER_SOL;
    const balanceUSD = Math.round(balanceSOL * solPriceInUSD);

    wallets.push({ address: walletAddress, sol: balanceSOL, usd: balanceUSD });
  }

  return new SuccessResponse(wallets);
};

export const getTransactionsPerSecond = async () => {
  const tpsTimeSeries = Solana.tpsTimeSeries;
  const isReady = tpsTimeSeries.isReady;

  if (!isReady) {
    return new ErrorResponse("Time series data is not ready yet");
  }

  const data = tpsTimeSeries.getData();

  return new SuccessResponse(data);
};
