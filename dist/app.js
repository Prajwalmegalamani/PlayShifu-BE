"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const body_parser_1 = __importDefault(require("body-parser"));
const logger_1 = __importDefault(require("./middleware/logger"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const errorHandler_1 = require("./middleware/errorHandler");
const compression_1 = __importDefault(require("compression"));
const app = (0, express_1.default)();
// Compression middleware
app.use((0, compression_1.default)());
// Security middleware
app.use((0, helmet_1.default)());
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests, please try again later.",
}));
// Middleware
app.use(body_parser_1.default.json());
app.use(logger_1.default);
// Routes
app.use("/api/v1/products", productRoutes_1.default);
app.use("/api/v1/admin", adminRoutes_1.default);
// Error handling middleware
app.use(errorHandler_1.errorHandler);
exports.default = app;
