import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { insertAfterElement } from "../../../../../lib/utils";
import ModalWindow from "./components/ModalWindow/ModalWindow";

export default () => {
	const { ID, VARIATION } = shared;

	setup();

	fireEvent("Conditions Met");

	// eslint-disable-next-line no-console

	// -----------------------------
	// Add events that apply to both variant and control
	// @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
	// -----------------------------
	// ...

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (VARIATION == "control") {
		return;
	}

	// -----------------------------
	// Write experiment code here
	// -----------------------------
	// ...

	// // Add mobile quick-view buttons
	const addMobileQuickViewButtons = (el) => {
		const alreadyAddedButton = el.querySelector(
			`.${ID}-mobile-quick-button`
		);

		if (!alreadyAddedButton) {
			const contentWrapper = el.querySelector(".tile-wrapper");
			const quickViewButton = el.querySelector(".quickviewbutton");

			const mobileQuickViewButton = document.createElement("button");
			mobileQuickViewButton.classList.add(`${ID}-mobile-quick-button`);
			mobileQuickViewButton.textContent = "Quick View";
			mobileQuickViewButton.addEventListener("click", () => {
				quickViewButton.click();
				fireEvent("User opened quick buy on mobile");
			});

			insertAfterElement(contentWrapper, mobileQuickViewButton);
		}
	};

	const allProducts = document.querySelectorAll(
		".primary-content .product-tile"
	);

	allProducts.forEach((product) => addMobileQuickViewButtons(product));

	const productList = document.getElementById("main");

	// // Add mobile quick-view buttons to injected elements
	new MutationObserver((mutations) => {
		for (let i = 0; i < mutations.length; i += 1) {
			const mutation = mutations[i];

			if (mutation.addedNodes.length !== 0) {
				const addedNodes = mutation.addedNodes;

				for (let i = 0; i < addedNodes.length; i += 1) {
					const node = addedNodes[i];

					if (
						node.id === "search-result-items" ||
						node.id === "primary"
					) {
						const allProducts =
							node.querySelectorAll(".product-tile");

						for (let i = 0; i < allProducts.length; i += 1) {
							addMobileQuickViewButtons(allProducts[i]);
						}
					}
				}
			}
		}
	}).observe(productList, {
		childList: true,
		subtree: true,
	});

	// Wait for modal element to exist
	new MutationObserver((_, observer) => {
		const modal = document.querySelector(".ui-dialog");
		if (modal) {
			waitForModalToOpen(modal);
			observer.disconnect();
		}
	}).observe(document.body, {
		childList: true,
	});

	const waitForModalToOpen = (modal) => {
		new MutationObserver((_, observer) => {
			if (modal.style.display !== "none") {
				document.body.style.overflow = "hidden";
				renderNewModal(modal);
				waitForModalToClose(modal);
				observer.disconnect();
			}
		}).observe(modal, { attributeFilter: ["style"] });
	};

	const waitForModalToClose = (modal) => {
		new MutationObserver((_, observer) => {
			if (modal.style.display === "none") {
				document.body.style.overflow = "initial";
				waitForModalToOpen(modal);
				fireEvent("Quick buy modal closed");
				observer.disconnect();
			}
		}).observe(modal, { attributeFilter: ["style"] });
	};

	const getDescription = (el) => {
		let n;
		const nodes = [];
		const walk = document.createTreeWalker(
			el,
			NodeFilter.SHOW_TEXT,
			null,
			false
		);

		while ((n = walk.nextNode())) nodes.push(n);

		for (let i = 0; i < nodes.length; i += 1) {
			if (
				nodes[i].textContent.replace(/[\n\t\r]/g, "") !== "" &&
				!nodes[i].textContent.includes("Best Before End")
			)
				return nodes[i];
		}
	};

	const fetchProductData = async (url) => {
		const page = await fetch(url);
		const html = await page.text();
		const data = new DOMParser().parseFromString(html, "text/html");
		const title = data.querySelector("#page_heading h1").textContent;
		const subtitle = data.querySelector("#page_heading h3").textContent;
		const imageSingle = data.querySelector(".primary-image");
		const imageCarousel = data.querySelector(
			"#thumbnails .thumb.selected img.productthumbnail"
		);
		const image = imageSingle ? imageSingle.src : imageCarousel.src;
		let description;

		if (
			data.querySelector("#tabDesc") ||
			data.querySelector("#tabCocoafactor")
		) {
			description = getDescription(
				data.querySelector("#tabDesc") ||
					data.querySelector("#tabCocoafactor")
			).textContent;
		} else if (data.querySelector("#pdpMain #page_heading h3")) {
			description = data
				.querySelector("#pdpMain #page_heading h3")
				.innerText.trim();
		}
		const menuItems = data.querySelectorAll(
			".component-content ul li > div"
		);
		const ingredients =
			data.querySelector("#tabIngredients") ||
			data.querySelector("#tabRecipe");
		const price =
			data.querySelector(".price-wrapper") ||
			data.querySelector(".block-add-to-cart .product-price");
		const reviews = data.querySelector(
			".product-review-links.product-review-links-top"
		);
		const menu = [];

		menuItems.forEach((item) => {
			const title = item.querySelector(".prod-name").textContent;
			const image = item.querySelector(".product-image img").src;

			menu.push({ title, image });
		});

		return {
			title,
			subtitle,
			image,
			description,
			menu,
			ingredients,
			price,
			url,
			reviews,
		};
	};

	const renderNewModal = (modal) => {
		const productURL = modal.querySelector(".view-details").href;
		modal.style.opacity = 0;
		modal.pointerEvents = "none";

		const closeModal = () => {
			const closeButton = modal.querySelector(
				".ui-dialog-titlebar-close"
			);
			closeButton.click();
		};

		const newModal = new ModalWindow(() => closeModal());

		insertAfterElement(modal, newModal.el);

		fetchProductData(productURL).then((data) => {
			newModal.productData = data;
		});
	};
};
