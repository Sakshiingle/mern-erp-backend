// Import Product model (MongoDB collection)
import Product from "../models/Product.js";

/*
  @desc    Create a new product
  @route   POST /api/products
  @access  Private (later we will protect it)
*/
const createProduct = async (req, res) => {
  try {
    // Destructure product data from request body
    const { name, sku, price, stock, reorderLevel } = req.body;

    // Basic validation
    if (!name || !sku || !price) {
      throw new Error("Name, SKU and Price are required");
    }

    // Check if product already exists (SKU must be unique)
    const productExists = await Product.findOne({ sku });
    if (productExists) {
      throw new Error("Product with this SKU already exists");
    }

    // Create product in database
    const product = await Product.create({
      name,
      sku,
      price,
      stock,
      reorderLevel,
    });

    // Send success response
    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Export controller
export { createProduct };
