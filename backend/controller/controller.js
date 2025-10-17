
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import UserModel from "../model/models.js";

const generateToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });



// export const register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({
//         message: "Provide name, email, and password",
//         success: false,
//         error: true,
//       });
//     }

//     const existingUser = await UserModel.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({
//         message: "User already registered with this email",
//         success: false,
//         error: true,
//       });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const user = new UserModel({
//       name,
//       email,
//       password: hashedPassword,
     
//     });

//     await user.save();

//     const token = generateToken({ id: user._id, role: user.role });

//     return res.status(201).json({
//       success: true,
//       error: false,
//       message: "User registered successfully",
//       token,
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
       
//         createdAt: user.createdAt,
//         updatedAt: user.updatedAt,
//       },
//     });
//   } catch (error) {
//     console.error("Register Error:", error);
//     return res.status(500).json({
//       message: error.message || error,
//       success: false,
//       error: true,
//     });
//   }
// };
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check all fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, and password",
      });
    }

    // Check if email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already registered with this email",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Send success response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};
// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Provide email and password",
        success: false,
        error: true,
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found. Please register first.",
        success: false,
        error: true,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials. Please check your password.",
        success: false,
        error: true,
      });
    }

    const token = generateToken({ id: user._id, role: user.role });
    const { password: pwd, ...userData } = user._doc;

    return res.status(200).json({
      success: true,
      error: false,
      message: "Login successful",
      token,
      user: userData,
    });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({
      message: "Server error. Please try again later.",
      success: false,
      error: true,
    });
  }
};


export const logoutUser = (req, res) => {
  try {
    return res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({ success: false, message: "Server error during logout" });
  }
};







