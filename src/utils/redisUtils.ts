import redisClient from "../config/redis";

// Cache product
export const cacheProduct = async (
  productId: string,
  product: any
): Promise<void> => {
  await redisClient.set(`product:${productId}`, JSON.stringify(product), {
    EX: 3600,
  }); // Cache for 1 hour
};

// Get cached product
export const getCachedProduct = async (
  productId: string
): Promise<any | null> => {
  const cachedProduct = await redisClient.get(`product:${productId}`);
  return cachedProduct ? JSON.parse(cachedProduct) : null;
};

// Cache product list
export const cacheProductList = async (
  key: string,
  products: any[]
): Promise<void> => {
  await redisClient.set(key, JSON.stringify(products), { EX: 3600 }); // Cache for 1 hour
};

// Get cached product list
export const getCachedProductList = async (
  key: string
): Promise<any[] | null> => {
  const cachedList = await redisClient.get(key);
  return cachedList ? JSON.parse(cachedList) : null;
};
