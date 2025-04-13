"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const config_1 = __importDefault(require("./config"));
let redisClient;
// Get Redis client
const getRedisClient = () => {
    if (!redisClient) {
        redisClient = (0, redis_1.createClient)({
            url: config_1.default.redisURL,
        });
        // Log when Redis is connected
        redisClient.on("connect", () => {
            console.log("Redis connected successfully");
        });
        // Log when Redis connection fails
        redisClient.on("error", (err) => {
            console.error("Redis connection error:", err);
        });
    }
    return redisClient;
};
exports.default = getRedisClient();
