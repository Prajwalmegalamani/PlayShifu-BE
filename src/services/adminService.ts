import Product from "../models/Product";

/**
 * Seed products
 * @returns Promise<any>
 */
export const seedProducts = async (): Promise<any> => {
  const products = [
    {
      name: "Product 1",
      description: "Description 1",
      price: 100,
      category: "Category A",
    },
    {
      name: "Product 2",
      description: "Description 2",
      price: 200,
      category: "Category B",
    },
    {
      name: "Product 3",
      description: "Description 3",
      price: 300,
      category: "Category C",
    },
  ];

  await Product.insertMany(products);
  return products;
};
