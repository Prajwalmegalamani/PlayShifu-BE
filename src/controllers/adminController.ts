import { Request, Response, NextFunction } from "express";
import { seedProducts } from "../services/adminService";
import { sendData } from "../utils/responseUtils";

// Seed products controller
export const seedProductsController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const products = await seedProducts();
    sendData(res, "Products seeded successfully", products);
  } catch (error) {
    next(error);
  }
};
