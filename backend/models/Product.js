// Import mongoose to talk to MongoDB
import mongoose from "mongoose";

/*
  Create Product Schema
  Schema = structure of a document in MongoDB
*/
const productSchema = new mongoose.Schema(
  {
    // Product name
    name: {
      type: String,
      required: true,
    },

    // Unique product code
    sku: {
      type: String,
      required: true,
      unique: true,
    },

    // Selling price
    price: {
      type: Number,
      required: true,
    },

    // Available stock
    stock: {
      type: Number,
      default: 0,
    },

    // Alert level when stock is low
    reorderLevel: {
      type: Number,
      default: 5,
    },
  },

  // Automatically add createdAt & updatedAt
  {
    timestamps: true,
  }
);

// Convert schema into MongoDB model
const Product = mongoose.model("Product", productSchema);

// Export so controllers can use it
export default Product;
