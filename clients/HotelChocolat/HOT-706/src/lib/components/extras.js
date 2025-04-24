const extras = (id, index) => {
    const htmlStr = `
    <div class="${id}__extrasContainer">
        <div class="${id}__extra-option">
            <label id='${id}-giftbag'>
                <input type="checkbox" name="extra-${index}">
                <div class="${id}__custom-radio">
                    <p class='${id}__titleText'>Add a luxury gift bag</p>
                    <p class='${id}__priceText'>£3.00</p>
                </div>
                <div class="${id}__img">
                    <img src='https://blcro.fra1.digitaloceanspaces.com/HOT-706/Gift%20Box.png'/>   
                </div>
            </label>
        </div>

        <div class="${id}__extra-option">
            <label id='${id}-giftbox'>
                <input type="checkbox" name="extra-${index}">
                <div class="${id}__custom-radio">
                    <p class='${id}__titleText'>Add a luxury gift box</p>
                    <p class='${id}__priceText'>£5.00</p>
                </div>
                <div class="${id}__img">
                    <img src='https://blcro.fra1.digitaloceanspaces.com/HOT-706/Gift%20Bag.png'/>
                </div>
            </label>
        </div>
    </div>
    `;

    return htmlStr;
};
export default extras;
