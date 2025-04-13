import Product, { IProduct } from "../models/Product";

// Get products service
export const getProducts = async (
  page: number,
  limit: number
): Promise<IProduct[]> => {
  const products = await Product.find()
    .skip((page - 1) * limit)
    .limit(limit);
  return products;
};

// Get product by ID service
export const getProductById = async (id: string): Promise<IProduct | null> => {
  const product = await Product.findById(id);
  return product;
};

// Get products by category service
export const getProductsByCategory = async (
  category: string
): Promise<IProduct[]> => {
  const products = await Product.find({ category });
  return products;
};
