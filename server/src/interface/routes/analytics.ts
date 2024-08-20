import { Router } from "express";
import { AnalyticsController } from "../controllers";
import { handleRequest } from "./utilities";

const router = Router();

router.get(
  "/marketCapDistribution",
  handleRequest((_) => AnalyticsController.getMarketCapDistribution()),
);

router.get(
  "/transactionsPerSecond",
  handleRequest((_) => AnalyticsController.getTransactionsPerSecond()),
);

router.get(
  "/walletBalance",
  handleRequest((_) => AnalyticsController.getWalletBalance()),
);

export default router;
