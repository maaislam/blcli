import { fireEvent } from "../../../../../../core-files/services";
import shared from "../../../../../../core-files/shared";

const clickHandler = (event) => {
	const { target } = event;
	const { ID } = shared;

	if (target.closest('[data-test-id="my-products-button"]')) {
		fireEvent("Customer clicks “Buy Again”");
	} else if (target.closest(`.${ID}__ctabtn--yellow`)) {
		fireEvent("Customer clicks Trade Counter");
	} else if (target.closest(`.${ID}__ctabtn--gray`)) {
		fireEvent("Customer clicks Continue to main site");
	} else if (
		target.closest(
			'[data-test-id="call-out-block-link"][href="/tc/buy-again-list"]'
		)
	) {
		fireEvent("Customer clicks Buy it Again");
	} else if (
		target.closest(
			'[data-test-id="call-out-block-link"][href="/accountDashboard"]'
		)
	) {
		fireEvent("Customer clicks Manage Your Account");
	} else if (
		target.closest(
			'[data-test-id="call-out-block-link"][href="/accountDashboard/sharedAccess"]'
		)
	) {
		fireEvent("Customer clicks Shared Access");
	} else if (
		target.closest(
			'[data-test-id="my-products-button-menu-item"][href="/accountDashboard/myProducts"]'
		)
	) {
		fireEvent("Customer clicks “Buy Again”");
	}
};

export default clickHandler;
