import shared from "../../../../../../core-files/shared";

const { ID } = shared;

const purchaseOptions = (callback) => {
	const el = document.createElement("div");
	el.classList.add(`${ID}-purchase-option`);
	el.innerHTML = /* HTML */ `
		<h3 class="${ID}-purchase-option__heading">
			Choose your purchase option:
		</h3>
		<ul class="${ID}-purchase-option__list">
			<li class="${ID}-purchase-option__list-item">
				<button
					class="${ID}-purchase-option__button"
					data-purchase-option-button
					data-purchase-option="once"
				>
					The Velvetiser only
				</button>
			</li>
			<li class="${ID}-purchase-option__list-item">
				<button
					class="${ID}-purchase-option__button"
					data-purchase-option-button
					data-purchase-option="subscription"
				>
					Buy with subscription
					<span>SAVE £50</span>
				</button>
			</li>
		</ul>
	`;

	const buttons = el.querySelectorAll("[data-purchase-option-button]");

	buttons.forEach((button) => {
		button.addEventListener("click", callback);
	});

	return el;
};

export default purchaseOptions;
