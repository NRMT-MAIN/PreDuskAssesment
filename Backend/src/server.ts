import "reflect-metadata";
import "./container";
import express from 'express';
import { serverConfig } from './config';
import pingRouter from './routers/ping.router';
import v1Router from './routers/v1.router';
import { attachCorrelationIdMiddleware } from './middleware/correlation.middleware';
import { appErrorHandeler, genericErrorHandeler } from './middleware/error.middleware';
import { container } from "./container";
import { DatabaseConfig } from "./config/db.config";
import cors from 'cors';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Vite default port
  credentials: true
}));

app.use(attachCorrelationIdMiddleware);
app.use(express.json());
app.use("/api/v1", v1Router);
app.use(appErrorHandeler);
app.use(genericErrorHandeler);



(async () => {
  try {
    const dbConfig = container.resolve(DatabaseConfig);
    await dbConfig.initialize();
    console.log("Database initialized successfully");

    app.listen(serverConfig.PORT, () => {
      console.log(`Server is running on port ${serverConfig.PORT}`);
    });
  } catch (error) {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  }
})();

