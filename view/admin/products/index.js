import layout from "../layout.js";

export default ({ products }) => {
	const renderProducts = products
		.map((products) => {
			return `<div>${products.title}</div>`;
		})
		.join("");
	return layout(`
    <h1 class="title">Products</h1>
    ${renderProducts}
    `);
};
