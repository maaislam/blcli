import getSummary from "./getSummary";
import orderSummaryAccordion from "../components/orderSummaryAccordion";
import { isMobile } from "./utils";

const setOrderSummary = (id) => {
    getSummary().then((doc) => {
        const main = document.querySelector('#main');
        const orderSummary = doc.querySelector('table.order-totals-table');
        const orderSummaryHeading = `<tr class="${id}__orderSummaryHeading"><td>Order summary</td></tr>`;
        const orderSummaryTbody = orderSummary.querySelector('tbody');
        orderSummaryTbody.insertAdjacentHTML('afterbegin', orderSummaryHeading);
        orderSummary.classList.add(`${id}__orderSummary`);

        if (isMobile()) {
            const pageHeadingElem = doc.querySelector('#page_heading h1');
            const itemCountText = pageHeadingElem.textContent;
            const itemCount = itemCountText.split('(')[1];

            main.insertAdjacentHTML('beforebegin', orderSummaryAccordion(id, orderSummary, `${itemCount}`));
            return;
        }

        main.insertAdjacentElement('afterend', orderSummary);
    });
};
export default setOrderSummary;
