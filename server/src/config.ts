import dotenv from "dotenv";

dotenv.config();

export const getEnv = (key: string, defaultValue: string = ""): string => {
  const value = process.env[key] || defaultValue;
  if (!value && process.env.NODE_ENV !== "test") {
    throw new Error(`${key}: Env variable is required`);
  }
  return value;
};

export const isProd = process.env.NODE_ENV === "production";
