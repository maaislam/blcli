const billingAddress = (id, address, index) => {
    const formattedAddress = address.replace(/, /g, "<br>");

    const htmlStr = `
    <div class="${id}__billingContainer" data-index="${index}">
        <div class="${id}__address-option" data-option="billing">
            <label>
                <input type="radio" class="${id}__radio" name="address-${index}" checked data-type="billing">
                <div class="${id}__custom-radio">
                    <p class='${id}__billingText'>Send to my billing address</p>
                    <p class='${id}__formattedAddress'>${formattedAddress}</p>
                </div>
                <div class="${id}__address-details">
                </div>
            </label>
            <div class="${id}__edit-link ${id}__editBillngAddress">Edit</div>
        </div>

        <!-- Gift Option -->
        <div class="${id}__address-option" data-option="gift">
            <label class="${id}__address-option-link">
                <input type="radio" class="${id}__radio" name="address-${index}" data-type="gift">
                <div class="${id}__custom-radio">
                    <p class='${id}__giftText'>Is this a gift? Send to a different address</p>
                    <p class='${id}__formattedAddress'>${formattedAddress}</p>
                </div>
            </label>
            <div class="${id}__edit-link ${id}__editGiftAddress">Edit</div>
        </div>
    </div>
    `;

    return htmlStr;
};
export default billingAddress;
