import express from "express";
import productsRepo from "../../repositories/products.js";

const router = express.Router();

router.get("admin/products", (req, res) => {});
router.get("/admin/products/new", (req, res) => {});

export default router;
