import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

//@desc Auth user & get token
//@route GET /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("please include all fields");
  }
  const user = await User.findOne({
    email,
  });

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
    //Set JWT as HTTP-Only cookie

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc Register user
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  res.send("registered User");
});

//@desc Auth user & get token
//@route POST /api/users/logout
//@access Private
const logoutUser = asyncHandler(async (req, res) => {
  res.send("logout User");
});

//@desc Get user profile
//@route GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send(" User profile");
});

//@desc Update user profile
//@route PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("Update User profile");
});

//@desc Get all Users
//@route GET /api/users
//@access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send(" Get Users");
});

//@desc Get User by Id
//@route GET /api/users/:id
//@access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  res.send("Get User by id");
});

//@desc Update User by Id
//@route PUT /api/users/:id
//@access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("Update User by id");
});

//@desc Delete User
//@route DELETE /api/users/:id
//@access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("Delete User");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUsers,
  getUserById,
  getUserProfile,
  updateUser,
  updateUserProfile,
  deleteUser,
};
