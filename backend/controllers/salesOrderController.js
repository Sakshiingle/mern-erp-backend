import SalesOrder from "../models/SalesOrder.js";
import Product from "../models/productModel.js";

export const createSalesOrder = async (req, res) => {
  try {
    const { customerId, products } = req.body;

    // 1️⃣ Basic validation
    if (!customerId || !products || products.length === 0) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    let totalPrice = 0;

    // 2️⃣ Check products & stock, calculate total
    for (const item of products) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          message: `Product not found: ${item.productId}`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${product.name}`,
        });
      }

      totalPrice += product.price * item.quantity;
    }

    // 3️⃣ Create sales order
    const salesOrder = await SalesOrder.create({
      customerId,
      products,
      totalPrice,
    });

    // 4️⃣ Reduce stock
    for (const item of products) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity },
      });
    }

    // 5️⃣ Success response
    return res.status(201).json({
      message: "Sales order created successfully",
      order: salesOrder,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error while creating sales order" });
  }
};
