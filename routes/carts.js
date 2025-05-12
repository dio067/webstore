import express from "express";
import cartsRepo from "../repositories/carts.js";
import carts from "../repositories/carts.js";
const router = express.Router();

// Receive a POST request to add an item to a cart
router.post("/cart/products", async (req, res) => {
	// Which Cart?
	let cart;

	if (!req.session.cartId) {
		// In case we don't have one create one and assign the id of a cart as a cookie session id
		cart = await cartsRepo.create({ items: [] });
		req.session.cartId = cart.id;
	} else {
		// In Case we have a cart: Find it from the cart Repository
		cart = await cartsRepo.getOne(req.session.cartId);
	}

	// Whether add new to a cart or increment the quantity
	const exisistingItem = cart.items.find(
		(item) => item.id === req.body.productId
	);
	if (exisistingItem) {
		// Increment
		exisistingItem.quantity++;
	} else {
		// Add new Item
		cart.items.push({ id: req.body.productId, quantity: 1 });
	}

	await cartsRepo.update(cart.id, {
		items: cart.items,
	});

	res.send("Product added");
});

// Receive a GET request to show all items in a cart

// Recive a POST request to remove an item from a cart

export default router;
