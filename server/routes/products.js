import express from "express";
import { createProduct, getProducts, getProduct, deleteProduct } from "../controllers/productsController.js"

const router = express.Router();

router.get("https://nv.teknix.vn/wp-json/dokan/v1/products", getProducts)
router.post("https://nv.teknix.vn/wp-json/dokan/v1/products", createProduct)
router.get("https://nv.teknix.vn/wp-json/dokan/v1/products/:id", getProduct)

export default router;