import mongoose from "mongoose";
import Product from "../models/Product";
import connectDB from "../config/db";

const seedProducts = async (): Promise<void> => {
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
  ];

  await Product.insertMany(products);
  console.log("Dummy products added");
};

const run = async (): Promise<void> => {
  await connectDB();
  await seedProducts();
  mongoose.connection.close();
};

run();
