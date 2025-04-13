import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import bodyParser from "body-parser";
import logger from "./middleware/logger";
import productRoutes from "./routes/productRoutes";
import adminRoutes from "./routes/adminRoutes";
import { errorHandler } from "./middleware/errorHandler";
import compression from "compression";

const app = express();

// Compression middleware
app.use(compression());

// Security middleware
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests, please try again later.",
  })
);

// Middleware
app.use(bodyParser.json());
app.use(logger);

// Routes
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/admin", adminRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
