"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
dotenv_1.default.config();
// Define the environment schema
const envSchema = zod_1.z.object({
    MONGO_URI: zod_1.z.string(),
    REDIS_URL: zod_1.z.string(),
    ADMIN_TOKEN: zod_1.z.string(),
    PORT: zod_1.z.string().transform(Number).default("5000"),
});
const envVars = envSchema.safeParse(process.env);
if (!envVars.success) {
    console.error("Environment variable validation error:", envVars.error.format());
    process.exit(1);
}
// Create the config object
const config = {
    mongoURI: envVars.data.MONGO_URI,
    redisURL: envVars.data.REDIS_URL,
    adminToken: envVars.data.ADMIN_TOKEN,
    port: envVars.data.PORT,
};
exports.default = config;
