"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config/config"));
const db_1 = __importDefault(require("./config/db"));
const redis_1 = __importDefault(require("./config/redis"));
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Connect to MongoDB
        yield (0, db_1.default)();
        // Connect to Redis
        yield redis_1.default.connect();
        // Start the server
        const server = app_1.default.listen(config_1.default.port, () => {
            console.log(`Server is running on port ${config_1.default.port}`);
        });
        // Graceful shutdown
        const shutdown = () => __awaiter(void 0, void 0, void 0, function* () {
            console.log("Shutting down server...");
            yield redis_1.default.quit(); // Close Redis connection
            server.close(() => {
                console.log("Server closed");
                process.exit(0);
            });
        });
        process.on("SIGINT", shutdown); // Handle Ctrl+C
        process.on("SIGTERM", shutdown); // Handle termination signal
    }
    catch (error) {
        console.error("Failed to start the server:", error);
        process.exit(1); // Exit the process with failure
    }
});
startServer();
