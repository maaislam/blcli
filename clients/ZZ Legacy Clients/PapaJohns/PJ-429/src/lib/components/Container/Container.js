import { h } from "preact";
import shared from "../../../../../../../core-files/shared";

import Button from "../Button/Button";

const { ID } = shared;

export default function Container({
	children,
	drinkPrice,
	buttonState,
	onAdd,
	onClose,
}) {
	return (
		<div className={`${ID}-container ${ID}-transitions-only-after-page-load`}>
			<div className={`${ID}-container__close-button-wrapper`}>
				<button className={`${ID}-container__close-button`} onClick={onClose}>
					<span className={`${ID}-visually-hidden`}>Close</span>
				</button>
			</div>
			<div className={`${ID}-container__banner`}>
				<img
					src="https://blcro.fra1.digitaloceanspaces.com/PJ-429/pepsi-max-concrete.jpg"
					alt=""
				/>
				<div className={`${ID}-container__banner-info`}>
					<span className={`${ID}-container__banner-info-old-price`}>
						£{drinkPrice}
					</span>
					<span className={`${ID}-container__banner-info-new-price`}>
						£1.99
					</span>
				</div>
			</div>
			<div className={`${ID}-container__header`}>
				<h2>1.5L Pepsi Max for only £1.99!</h2>
				<p>
					Was £{drinkPrice}, Now £1.99,{" "}
					<span>Save {Math.floor(100 - (1.99 / drinkPrice) * 100)}%</span>
				</p>
			</div>
			<ul className={`${ID}-container__product-list`}>{children}</ul>
			<div className={`${ID}-container__action-buttons`}>
				<Button text={"Add to order"} onClick={onAdd} loading={buttonState} />
				<Button text="No thanks" onClick={onClose} secondary />
			</div>
		</div>
	);
}
