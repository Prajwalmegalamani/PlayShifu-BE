import { createClient } from "redis";
import config from "./config";

let redisClient: ReturnType<typeof createClient>;

// Get Redis client
const getRedisClient = (): ReturnType<typeof createClient> => {
  if (!redisClient) {
    redisClient = createClient({
      url: config.redisURL,
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

export default getRedisClient();
