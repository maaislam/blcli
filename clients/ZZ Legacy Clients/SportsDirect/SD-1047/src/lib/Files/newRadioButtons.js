export const newRadioButtons = (id) => {

    const htmlStr = `
    <div class="${id}__radioToggleContainer radioToggleContainer">
        <ul class="${id}__radioToggle radioToggle">
            <li class="newRadio deliveryRadio">
                <div class="innerRadio flex flexJustBet flexWrap">
                    <div class="selectionRadio"><input type="radio"><span></span></div>
                    <div class="selectionOptions flex flexJustBet deliverOption">
                        <div class="selectionDescription">
                            <h3>DELIVER</h3>
                            <div class="deliveryPrice">
                                <span class="deliveryPriceFrom">From</span>
                                <span class="deliveryPriceActual deliverPrice">£4.99</span>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            <li class="newRadio collectRadio">
                <div class="innerRadio flex flexJustBet flexWrap ">
                    <div class="selectionRadio"><input type="radio"><span></span></div>
                    <div class="selectionOptions flex flexJustBet collectOption">
                        <div class="selectionDescription">
                            <h3>COLLECT</h3>
                            <div class="deliveryPrice">
                                <span class="deliveryPriceFrom">From</span>
                                <span class="deliveryPriceActual collectPrice">£4.99</span>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>

        <div class="${id}__newSpendVoucher newSpendVoucher">Spend over £100 (excluding delivery charge) to get a <span>free
                £5 voucher</span> to use in-store</div>
    </div>`;
    return htmlStr.trim();
};