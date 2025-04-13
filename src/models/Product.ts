import mongoose, { Document, Schema } from "mongoose";

// Product interface
export interface IProduct extends Document {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

// Product schema
const productSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Add index to the product schema
productSchema.index({ name: 1, description: 1, price: 1, category: 1 });

// Product model
const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
