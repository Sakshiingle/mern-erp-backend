import PurchaseOrder from "../models/PurchaseOrder.js";

// Create Purchase Order
export const createPurchaseOrder = async (req, res) => {
  try {
    const { supplierName, products, expectedDate } = req.body;

    // Basic validation
    if (!supplierName || !products || products.length === 0) {
      return res.status(400).json({
        message: "Invalid purchase order data",
      });
    }

    const purchaseOrder = await PurchaseOrder.create({
      supplierName,
      products,
      expectedDate,
    });

    return res.status(201).json(purchaseOrder);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Get all Purchase Orders
export const getPurchaseOrders = async (req, res) => {
  try {
    const orders = await PurchaseOrder.find().sort({ createdAt: -1 });
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
