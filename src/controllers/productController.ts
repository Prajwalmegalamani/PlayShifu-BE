import { Request, Response, NextFunction } from "express";
import {
  cacheProduct,
  getCachedProduct,
  cacheProductList,
  getCachedProductList,
} from "../utils/redisUtils";
import { sendData, sendError } from "../utils/responseUtils";
import { getProducts, getProductById } from "../services/productService";

// Get products controller
export const getProductsController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Get query parameters
  const { page = 1, limit = 10 } = req.query;
  const cacheKey = `products:page:${page}:limit:${limit}`;

  // Check if page and limit are valid numbers
  if (
    isNaN(Number(page)) ||
    isNaN(Number(limit)) ||
    Number(page) <= 0 ||
    Number(limit) <= 0
  ) {
    sendError(res, "Invalid page or limit", 400);
    return;
  }

  try {
    // Check Redis cache
    const cachedProducts = await getCachedProductList(cacheKey);
    if (cachedProducts) {
      sendData(res, cachedProducts);
      return;
    }

    // Fetch from MongoDB
    const products = await getProducts(Number(page), Number(limit));

    // Cache the product list
    await cacheProductList(cacheKey, products);

    sendData(res, products);
  } catch (error) {
    next(error);
  }
};

// Get product by ID controller
export const getProductByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    // Check Redis cache
    const cachedProduct = await getCachedProduct(id);
    if (cachedProduct) {
      sendData(res, cachedProduct);
      return;
    }

    // Fetch from MongoDB
    const product = await getProductById(id);
    if (!product) {
      sendError(res, "Product not found", 404);
      return;
    }

    // Cache the product
    await cacheProduct(id, product);

    sendData(res, product);
  } catch (error) {
    next(error);
  }
};
