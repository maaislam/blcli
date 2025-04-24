import shared from "../../../../../../../core-files/shared";

const { ID } = shared;

export default function AddBasket(products, onRemove) {
  const el = document.createElement("div");
  el.classList.add(`${ID}-basket`);
  el.innerHTML = /* html */ `
		${
      products.length > 0
        ? /* html */ `
			<ul>
				${products
          .map(
            (product) => /*html */ `
						<li data-key="${product.sku}" class="${ID}-product">
							<img src="https://images.specsavers.com/glasses-images/${product.sku}-front-200x113.jpg" alt="" />
							<div class="${ID}-product-content">
								<h3>
									<a href="${product.url}">
										${product.name}
									</a>
								</h3>
								<span>From ${product.price}</span>
							</div>
							<div class="${ID}-product-buttons">
								<a href="${product.url}/lens-selector?sku=${product.sku}" class="${ID}-product-add-prescription">Add Prescription</a>
								<button data-remove-button data-sku="${product.sku}" class="${ID}-product-remove">
									<span>Remove Item from Basket</span>
								</button>
							</div>
						</li>
						`
          )
          .join("")}
			</ul>
		`
        : /* html */ `<p>You don't have any saved items.</p>`
    }
	`;

  el.querySelectorAll("button[data-remove-button]").forEach((button) =>
    button.addEventListener("click", (e) => onRemove(e))
  );

  return el;
}
