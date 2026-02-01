import Customer from "../models/Customer.js";

// Create a new customer
export const createCustomer = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    // Basic validation
    if (!name) {
      return res.status(400).json({
        message: "Customer name is required",
      });
    }

    const customer = await Customer.create({
      name,
      email,
      phone,
      address,
    });

    return res.status(201).json(customer);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Get all active customers
export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({ isActive: true });
    return res.status(200).json(customers);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
