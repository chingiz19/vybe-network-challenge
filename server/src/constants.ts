export const CLIENT_APP_BUILD_FOLDER = 'public';

export const walletAddresses = [
  // "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM", // binance exchange,
  "5VCwKtCXgCJ6kit5FybXjvriW3xELsFDhYrPSqtJNmcD",
  "FWznbcNXWQuHTawe9RxvQ2LdCENssh12dsznf4RiouN5",
  "61aq585V8cR2sZBeawJFt2NPqmN7zDi1sws4KLs5xHXV",
  "EXJHiMkj6NRFDfhWBMKccHNwdSpCT7tdvQeRf87yHm6T",
  "Q6XprfkF8RQQKoQVG33xT88H7wi8Uk1B1CC7YAs69Gi",
  "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1",
  "AVzP2GeRmqGphJsMxWoqjpUifPpCret7LqWhD8NWQK49",
  "9DrvZvyWh1HuAoZxvYWMvkf2XCzryCpGgHqrMjyDWpmo",
  "9uyDy9VDBw4K7xoSkhmCAm8NAFCwu4pkF6JeHUCtVKcX",
  "92GrvS6WuYFawBxNkNR7PWgLdcu5e7QJjnHXhaaQH4Gh",
];

export const LAMPORTS_PER_SOL = 1_000_000_000; // 1 SOL = 1 billion lamports

export const COINGECKO_TOKEN_IDS = {
  SOLANA: "solana",
  USDT: "tether",
  USDC: "usd-coin",
  LINK: "chainlink",
  RAYDIUM: "raydium",
  BONK: "bonk",
} as const;

export const COINGECKO_CURRENCIES = {
  USD: "usd",
  EUR: "eur",
  GBP: "gbp",
  JPY: "jpy",
  AUD: "aud",
  CAD: "cad",
  CHF: "chf",
  CNY: "cny",
  INR: "inr",
  BTC: "btc",
  ETH: "eth",
} as const;

export type CoinGeckoCurrency =
  typeof COINGECKO_CURRENCIES[keyof typeof COINGECKO_CURRENCIES];

export type TokenId =
  typeof COINGECKO_TOKEN_IDS[keyof typeof COINGECKO_TOKEN_IDS];

/**
 * An array of top 5 SPL tokens to be used for market cap calculation.
 * Each token is represented by its mint address on the Solana blockchain
 * and its corresponding CoinGecko ID.
 *
 * Mint addresses can be found on Solana Explorer
 * Reference: https://coinranking.com/coins/spl
 */
export const tokens: Array<
  {
    mintAddress: string;
    tokenId: TokenId;
    name: string;
  }
> = [
  {
    mintAddress: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
    tokenId: COINGECKO_TOKEN_IDS.BONK,
    name: "Bonk",
  },
  {
    mintAddress: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    tokenId: COINGECKO_TOKEN_IDS.USDT,
    name: "Tether USD (USDT)",
  },
  {
    mintAddress: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    tokenId: COINGECKO_TOKEN_IDS.USDC,
    name: "USD Coin (USDC)",
  },
  {
    mintAddress: "2wpTofQ8SkACrkZWrZDjXPitYa8AwWgX8AfxdeBRRVLX",
    tokenId: COINGECKO_TOKEN_IDS.LINK,
    name: "ChainLink Token (Portal)",
  },
  {
    mintAddress: "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
    tokenId: COINGECKO_TOKEN_IDS.RAYDIUM,
    name: "Raydium",
  },
] as const;
