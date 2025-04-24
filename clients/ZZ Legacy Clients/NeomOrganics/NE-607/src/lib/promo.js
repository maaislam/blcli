import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";

const { ID } = shared;

export default class PromoCode {
	constructor(root, promoCode) {
		this.root = root;
		this.promoCode = promoCode;
		this._render();
		this._bindCopyCode();
	}

	_render() {
		this.root.insertAdjacentHTML(
			"beforeend",
			`
    <div class="${ID}-promo-code">
			<div class="${ID}-promo-code__content">
      </div>
      <div class="${ID}-promo-code__redeem" data-open="true">
				<p>Apply the 25% OFF code in the checkout. *T&C's apply.</p>
        <div class="${ID}-promo-code__redeem-box">
          <div class="${ID}-promo-code__redeem-code">${this.promoCode}</div>
          <button type="button" class="${ID}-promo-code__redeem-copy">Copy</button>
        </div>
      </div>
    </div>
    `
		);
	}

	_bindCopyCode() {
		if (this.promoCode) {
			const copyCodeEl = this.root.querySelector(
				`.${ID}-promo-code__redeem-copy`
			);

			copyCodeEl.addEventListener("click", ({ target }) => {
				target.textContent = "Copied";
				navigator.clipboard.writeText(this.promoCode);
				fireEvent("Copy Code");

				setTimeout(() => (target.textContent = "Copy"), 1000);
			});
		}
	}
}
