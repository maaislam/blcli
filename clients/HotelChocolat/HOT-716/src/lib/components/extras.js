const extras = (id, index) => {
    const htmlStr = `
    <div class="${id}__extrasContainer">
        <div class="${id}__extra-option">
            <label id='${id}-giftbag' class='${id}__giftBagLabel'>
                <input type="checkbox" name="extra-${index}">
                <div class="${id}__custom-radio">
                    
                </div>
                <div class="${id}__img">
                    <img src='https://assets-manager.abtasty.com/deb3630b862e6561a9786af7a3f94baf/gift-bag-with-shad.png'/>   
                </div>
                <div class="${id}__giftBag">
                    <p class='${id}__titleText'>Gift Bag</p>
                    <p class='${id}__descriptionText'>Receive your order in a signature gift bag with black ribbon finishing and wrapping paper.</p>
                    <p class='${id}__priceText'>£3.00</p>
                </div>
            </label>
        </div>

        <div class="${id}__extra-option">
            <label id='${id}-giftbox' class='${id}__giftBoxLabel'>
                <input type="checkbox" name="extra-${index}">
                <div class="${id}__custom-radio">
                    
                </div>
                <div class="${id}__img">
                    <img src='https://assets-manager.abtasty.com/deb3630b862e6561a9786af7a3f94baf/gift-box-with-shad.png'/>
                </div>
                <div class="${id}__giftBox">
                    <p class='${id}__titleText'>Gift Box</p>
                    <p class='${id}__descriptionText'>Receive your order in an elegantly gift box embossed with the iconic Hotel Chocolat logo.</p>
                    <p class='${id}__priceText'>£5.00</p>
                </div>
            </label>
        </div>
    </div>
    `;

    return htmlStr;
};
export default extras;
