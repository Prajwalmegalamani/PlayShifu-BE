import express, { Request, Response } from "express";
import Product, { IProduct } from "../models/Product";
import redisClient from "../config/redis";

const router = express.Router();

// Fetch products with pagination
router.get("/", async (req: Request, res: Response): Promise<void> => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  try {
    const products = await Product.find()
      .skip((page - 1) * limit)
      .limit(limit);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

// Fetch product by ID with Redis caching
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    // Check Redis cache
    const cachedProduct = await redisClient.get(`product:${id}`);
    if (cachedProduct) {
      res.json(JSON.parse(cachedProduct));
      return;
    }

    // Fetch from MongoDB
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    // Cache the product in Redis
    await redisClient.set(`product:${id}`, JSON.stringify(product), {
      EX: 3600, // Cache for 1 hour
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
});

export default router;
