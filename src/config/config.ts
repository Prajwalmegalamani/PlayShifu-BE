import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

// Define the environment schema
const envSchema = z.object({
  MONGO_URI: z.string(),
  REDIS_URL: z.string(),
  ADMIN_TOKEN: z.string(),
  PORT: z.string().transform(Number).default("5000"),
});

const envVars = envSchema.safeParse(process.env);

if (!envVars.success) {
  console.error(
    "Environment variable validation error:",
    envVars.error.format()
  );
  process.exit(1);
}

// Create the config object
const config = {
  mongoURI: envVars.data.MONGO_URI,
  redisURL: envVars.data.REDIS_URL,
  adminToken: envVars.data.ADMIN_TOKEN,
  port: envVars.data.PORT,
};

export default config;
