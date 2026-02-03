import SalesOrder from "../models/SalesOrder.js";
import Product from "../models/productModel.js";

export const createSalesOrder = async (req, res) => {
  try {
    const { customerId, products } = req.body;

    // Basic validation
    if (!customerId || !products || products.length === 0) {
      return res.status(400).json({
        message: "Invalid sales order data",
      });
    }

    let totalPrice = 0;

    // Validate products and calculate total
    for (const item of products) {
      const product = await Product.findById(item.productId);

      if (!product || !product.isActive) {
        return res.status(404).json({
          message: "Product not found or inactive",
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${product.name}`,
        });
      }

      totalPrice += product.price * item.quantity;
    }

    // Create sales order
    const salesOrder = await SalesOrder.create({
      customerId,
      products,
      totalPrice,
    });

    // Reduce stock
    for (const item of products) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity },
      });
    }

    return res.status(201).json(salesOrder);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
