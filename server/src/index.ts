import express from "express";
import path from "path";
import routes from "./interface/routes";
import { errorHandler } from "./interface/middleware/errorHandler";
import { logger, logRequests } from "./infrastucture";
import { getEnv } from "./config";
import { CLIENT_APP_BUILD_FOLDER } from "./constants";

const app = express();

app.use(express.json());
app.use("/api", logRequests, routes);
app.use(errorHandler);

// Serve static files from the (React app's) build folder
app.use(express.static(path.join(process.cwd(), CLIENT_APP_BUILD_FOLDER)));

// Handle all routes to serve index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), CLIENT_APP_BUILD_FOLDER, "index.html"));
});

const PORT = getEnv("PORT", "3000");
app.listen(PORT, () => {
  logger.info(`✅ Server is running on port ${PORT}`);
});
