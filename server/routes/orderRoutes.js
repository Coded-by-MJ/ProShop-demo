import express from "express";
import {
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
  addOrderItems,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, admin, getOrders).post(protect, addOrderItems);

router.route("/mine").get(protect, getMyOrders);

router.route("/:id").get(protect, getOrderById);

router.put("/:id/pay", protect, updateOrderToPaid);
router.put("/:id/deliver", protect, admin, updateOrderToDelivered);

export default router;
