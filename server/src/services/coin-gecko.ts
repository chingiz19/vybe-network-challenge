import axios from "axios";
import {
  COINGECKO_CURRENCIES,
  COINGECKO_TOKEN_IDS,
  CoinGeckoCurrency,
  TokenId,
} from "../constants";
import { logger } from "../infrastucture";

type SolPriceResponse<T extends CoinGeckoCurrency> = {
  [key in TokenId]: {
    [key in T]: number;
  };
};

const getTokenPrices = async (
  currency: CoinGeckoCurrency,
  tokenIds: TokenId[],
) => {
  try {
    const response = await axios.get<
      SolPriceResponse<CoinGeckoCurrency>
    >(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: tokenIds.join(","),
          vs_currencies: currency,
        },
      },
    );

    return response.data;
  } catch (error) {
    logger.error("Error fetching SOL price:", error);
    throw new Error("Could not fetch SOL price");
  }
};

export const getPricesInUSD = async (tokenIds: TokenId[]) => {
  const prices: Partial<{ [T in TokenId]: number }> = {};

  const res = await getTokenPrices(COINGECKO_CURRENCIES.USD, tokenIds);

  for (const [key, value] of Object.entries(res)) {
    prices[key as TokenId] = value.usd;
  }

  return prices;
};

export const getSolPriceInUSD = async () =>
  (await getPricesInUSD([
    COINGECKO_TOKEN_IDS.SOLANA,
  ])).solana;
