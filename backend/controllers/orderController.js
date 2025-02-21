import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Placing Order using COD Method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const expectedDeliveryDate = new Date();
    expectedDeliveryDate.setDate(expectedDeliveryDate.getDate() + 7);

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
      expectedDeliveryDate: expectedDeliveryDate,
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    console.log(items);
    // Add credit points logic
    const creditPointsToAdd = items.length * 5;
    await userModel.findByIdAndUpdate(userId, {
      $inc: { creditPoints: creditPointsToAdd },
    });

    // Send email with order details
    const user = await userModel.findById(userId);
    const mailOptions = {
      from: 'inkdapper@gmail.com',
      to: user.email,
      subject: 'Order Confirmation',
      html: `
        <p>Your order has been placed successfully.<br> <span style="font-weight: bold; font-size: 18px; margin-top: 10px;">Order details:</span></p>
        <div>
          ${orderData.items.map(item => `
            <img src="${item.image}" alt="${item.name}" style="width: 100px; height: 100px; object-fit: cover; margin-left: 15px;" /> <br>
            <ul style="list-style-type: none; padding: 0;">
              <li><strong>Product Name:</strong> ${item.name} </li>
              <li><strong>Size:</strong> ${item.size} </li>
              <li><strong>Quantity:</strong> ${item.quantity}</li>
              <li><strong>Price:</strong> ${item.price}</li>
              <li><strong>Order Date:</strong> ${new Date(orderData.date).toLocaleDateString()}</li>
              <li><strong>Expected Delivery Date:</strong> ${new Date(orderData.expectedDeliveryDate).toLocaleDateString()}</li>
              <li style="margin-top: 10px; bottom-border: 1px solid #000;padding-top: 10px;"><strong>Total Price:</strong> ${item.price * item.quantity}</li>
            </ul>
          `).join('')}
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Placing Order using Stripe Method
const placeOrderStripe = async (req, res) => {};

// Placing Order using Razorpay Method
const placeOrderRazorpay = async (req, res) => {};

// All order data from admin panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// User Order Data for Frontend
const userOrders = async (req, res) => {
  try {
    const { userId, orderId, returnOrderStatus, returnReason, cancelReason } = req.body;
    const orders = await orderModel.find({ userId });
    const returned = await orderModel.findByIdAndUpdate(orderId, {
      returnOrderStatus,
      returnReason,
      cancelReason
    });
    console.log(userId);
    res.json({ success: true, message: 'Order returned', orders, returned });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// User Details for Profiles
const userDetails = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update order status from admin panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status, deliveryDate } = req.body;

    let updateData = { status, deliveryDate };

    if (status === "Delivered") {
      const returnDate = new Date(deliveryDate);
      returnDate.setDate(returnDate.getDate() + 7);
      updateData.returnDate = returnDate;
    }

    await orderModel.findByIdAndUpdate(orderId, updateData);
    console.log(updateData.returnDate);
    res.json({ success: true, message: "Status Updated", returnDate: updateData.returnDate });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Function to get credit points
const clearCreditPoints = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    const creditPoints = await userData.creditPoints;

    await userModel.findByIdAndUpdate(userId, { creditPoints: 0 });
    res.json({ success: true, message: "Cleared Credit Points", creditPoints });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Count returned orders
const countReturnedOrders = async (req, res) => {
  try {
    const { userId } = req.query;
    const count = await orderModel.countDocuments({ userId, returnOrderStatus: 'Return Confirmed' });
    res.json({ success: true, count });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  userDetails,
  clearCreditPoints,
  countReturnedOrders,
};