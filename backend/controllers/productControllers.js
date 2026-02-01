// Import Product model (MongoDB collection)
import Product from "../models/productModel.js";

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

/**
 * @desc    Get products with pagination & search
 * @route   GET /api/products
 * @access  Admin, Inventory, Sales
 */
const getProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || "";

    const query = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { sku: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const totalCount = await Product.countDocuments(query);

    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      products,
      page,
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 // Get product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({
      message: "Invalid product ID",
    });
  }
};
// Update product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const { name, sku, price, stock, reorderLevel } = req.body;

    if (sku && sku !== product.sku) {
      const skuExists = await Product.findOne({ sku });
      if (skuExists) {
        return res.status(400).json({
          message: "SKU already exists",
        });
      }
    }

    product.name = name ?? product.name;
    product.sku = sku ?? product.sku;
    product.price = price ?? product.price;
    product.stock = stock ?? product.stock;
    product.reorderLevel = reorderLevel ?? product.reorderLevel;

    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update product",
    });
  }
};
// Soft delete product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    product.isActive = false;
    await product.save();

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete product",
    });
  }
};
 export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch products",
    });
  }
};



// Export controller
export {createProduct,getProducts,getProductById,updateProduct,deleteProduct,};


