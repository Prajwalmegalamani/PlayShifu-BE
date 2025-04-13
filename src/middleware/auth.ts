import { Request, Response, NextFunction } from "express";
import config from "../config/config";

// Admin authentication middleware
const adminAuth = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization;

  if (!token || token !== `Bearer ${config.adminToken}`) {
    res.status(403).json({ message: "Unauthorized access" });
    return;
  }

  next();
};

export default adminAuth;
