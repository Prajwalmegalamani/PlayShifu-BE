import app from "./app";
import config from "./config/config";
import connectDB from "./config/db";
import redisClient from "./config/redis";

const startServer = async (): Promise<void> => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Connect to Redis
    await redisClient.connect();

    // Start the server
    const server = app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });

    // Graceful shutdown
    const shutdown = async () => {
      console.log("Shutting down server...");
      await redisClient.quit(); // Close Redis connection
      server.close(() => {
        console.log("Server closed");
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown); // Handle Ctrl+C
    process.on("SIGTERM", shutdown); // Handle termination signal
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1); // Exit the process with failure
  }
};

startServer();
