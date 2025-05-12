import express from "express";
import { check, validationResult } from "express-validator";
import multer from "multer";
import productsRepo from "../../repositories/products.js";
import productsNewTemplate from "../../view/admin/products/new.js";
import validtors from "./validtors.js";
import middlewares from "./middlewares.js";
import productsIndexTemplate from "../../view/admin/products/index.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/admin/products", async (req, res) => {
	const products = await productsRepo.getAll();
	res.send(productsIndexTemplate({ products }));
});

router.get("/admin/products/new", (req, res) => {
	res.send(productsNewTemplate({}));
});
router.post(
	"/admin/products/new",
	upload.single("image"),
	[validtors.requireTitle, validtors.requirePrice],
	middlewares.handleErrors(productsNewTemplate),
	async (req, res) => {
		const image = req.file.buffer.toString("base64");

		const { title, price } = req.body;

		await productsRepo.create({ title, price, image });

		res.redirect("/admin/products");
	}
);
export default router;
