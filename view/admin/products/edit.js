import layout from "../layout.js";
import helpers from "../../helpers.js";

export default ({ product, errors }) => {
	return layout(
		`
      <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="subtitle">Edit a Product</h1>

          <form method="POST" enctype="multipart/form-data">
            <div class="field">
              <label class="label">Title</label>
              <input value="${
								product.title
							}" class="input" placeholder="Title" name="title">
              <p class="help is-danger">${helpers.getError(errors, "title")}</p>
            </div>
            
            <div class="field">
              <label class="label">Price</label>
              <input value="${
								product.price
							}" class="input" placeholder="Price" name="price">
              <p class="help is-danger">${helpers.getError(errors, "price")}</p>
            </div>
            
            <div class="field">
              <label class="label">Image</label>            
              <input type="file" name="image" />
            </div>
            <br />
            <button class="button is-primary">Edit</button>
          </form>
        </div>
      </div>
    `
	);
};
