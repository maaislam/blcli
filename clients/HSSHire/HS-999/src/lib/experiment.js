export default () => {
	const products = document.querySelectorAll(
		".product_listing_inner.product_list_section .prod_list_outer, #search_result #resultsList .prod_list_outer"
	);

	if (products.length > 0) {
		products.forEach((product) => {
			const widget = product.querySelector(".trustpilot-widget");
			if (widget) {
				const url = widget.parentElement.querySelector(".details span a").href;
				const cta = document.createElement("a");
				cta.classList.add("HS-999-cta");
				cta.textContent = "Hire Now";
				cta.href = url;

				widget.insertAdjacentElement("afterend", cta);

				const h5 = widget.parentElement.querySelector("h5");

				if (h5) {
					h5.remove();
				}
			}
		});
	}
};
