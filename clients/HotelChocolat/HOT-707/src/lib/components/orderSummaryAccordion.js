const orderSummaryAccordion = (id, orderSummary, itemCount) => {
    const htmlStr = `<div class="${id}__accordionWrapper">
        <div class="${id}__accordion">
            <div class="${id}__accordion-header">
                <div class="${id}__accordion-title">ORDER SUMMARY (${itemCount}</div>
                <div class="${id}__accordion-icon plus-icon">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.33331 6H10.6666" stroke="black" stroke-width="1.1" stroke-miterlimit="10" stroke-linecap="round"/>
                        <path d="M6 10.6666V1.33325" stroke="black" stroke-width="1.1" stroke-miterlimit="10" stroke-linecap="round"/>
                    </svg>
                </div>
                <div class="${id}__accordion-icon minus-icon">
                    <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.33337 1H10.6667" stroke="black" stroke-width="1.1" stroke-miterlimit="10" stroke-linecap="round"/>
                    </svg>
                </div>
            </div>
            <div class="${id}__accordion-content">
                ${orderSummary.outerHTML}
            </div>
        </div>
    </div>`;

    return htmlStr;
};

export default orderSummaryAccordion;
