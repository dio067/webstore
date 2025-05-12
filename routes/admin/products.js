import express from "express";
import { check, validationResult } from "express-validator";
import multer from "multer";
import productsRepo from "../../repositories/products.js";
import productsNewTemplate from "../../view/admin/products/new.js";
import productsEditTemplate from "../../view/admin/products/edit.js";
import validtors from "./validtors.js";
import middlewares from "./middlewares.js";
import productsIndexTemplate from "../../view/admin/products/index.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/admin/products", middlewares.requireAuth, async (req, res) => {
	const products = await productsRepo.getAll();
	res.send(productsIndexTemplate({ products }));
});

router.get("/admin/products/new", middlewares.requireAuth, (req, res) => {
	res.send(productsNewTemplate({}));
});

router.post(
	"/admin/products/new",
	middlewares.requireAuth,
	[validtors.requireTitle, validtors.requirePrice],
	middlewares.handleErrors(productsNewTemplate),
	async (req, res) => {
		const image = req.file.buffer.toString("base64");

		const { title, price } = req.body;

		await productsRepo.create({ title, price, image });

		res.redirect("/admin/products");
	}
);

router.get(
	"/admin/products/:id/edit",
	middlewares.requireAuth,
	async (req, res) => {
		const product = await productsRepo.getOne(req.params.id);

		if (!product) {
			return res.send("Product not found");
		}

		res.send(productsEditTemplate({ product }));
	}
);

router.post(
	"/admin/products/:id/edit",
	middlewares.requireAuth,
	upload.single("image"),
	[validtors.requireTitle, validtors.requirePrice],
	middlewares.handleErrors(productsEditTemplate),
	async (req, res) => {
		const changes = req.body;

		if (req.file) {
			changes.image = req.file.buffer.toString("base64");
		}
		try {
			await productsRepo.update(req.params.id, changes);
		} catch (err) {
			return res.send("Could not find item");
		}

		res.redirect("/admin/products/");
	}
);
export default router;
