import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Route for user login
const loginUser = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    if (!emailOrPhone) {
      return res.json({ success: false, message: "Email or phone is required" });
    }

    // Check if the input is an email or phone number
    const isEmail = validator.isEmail(emailOrPhone);
    const user = isEmail
      ? await userModel.findOne({ email: emailOrPhone })
      : await userModel.findOne({ phone: emailOrPhone });

    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid password" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for user profile
const profileUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const users = await userModel.findById(userId);
    res.json({ success: true, users });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Route for user register
const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    //checking user already exist or not
    const exists = await userModel.findOne({ email, phone });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Route for admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const checkPhone = async (req, res) => {
  const { phone } = req.body;
  const existingUser = await userModel.findOne({ phone });
  if (existingUser) {
    return res.json({
      success: false,
      message: "Phone number is already registered",
    });
  }
  res.json({ success: true, message: "Phone number is available" });
};

//Route for user register
const usersList = async (req, res) => {
  try {
    const userData = await userModel.find({});
    const userIds = userData.map(user => user._id);
    const counts = await Promise.all(userIds.map(async userId => {
      const count = await orderModel.countDocuments({ userId, returnOrderStatus: 'Return Confirmed' });
      return { userId, count };
    }));

    // Merge userData and counts
    const mergedData = userData.map(user => {
      const countData = counts.find(count => count.userId.equals(user._id));
      return {
        ...user._doc,
        returnOrderCount: countData ? countData.count : 0
      };
    });

    res.json({ success: true, message: "Users Listed", userList: mergedData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser, adminLogin, profileUser, checkPhone, usersList };
