import { searchIcon, percentIcon, cartIcon } from './data';

export const mobileBanner = (id) => {

    const htmlStr = `
    <div class="${id}__trade-counter-wrapper">
        <div class="${id}__trade-counter">
            <div class="${id}__trade-headline">
                <p>NEW! Shop faster and easier with our new Online Trade Counter</p>
            </div>
            <div class="${id}__trade-body">
                <div class="trade-item item01">
                    <div class="svg-image image01">${searchIcon()}</div>
                    <div class="trade-copy">
                        <p>Quick view</p>
                        <p>your favourites</p>
                    </div>
                </div>
                <div class="trade-item item02">
                    <div class="svg-image image02">${percentIcon()}</div>
                    <div class="trade-copy">
                        <p>See your trade</p>
                        <p>rates & discounts</p>
                    </div>
                </div>
                <div class="trade-item item03">
                    <div class="svg-image image03">${cartIcon()}</div>
                    <div class="trade-copy">
                        <p>One click reserve</p>
                        <p>stock & buy</p>
                    </div>
                </div>
            </div>
            <div class="${id}__trade-button">
                <div class="new-button">
                    <a href="https://www.travisperkins.co.uk/tc/buy-again-list">View Now</a>
                </div>
            </div>
        </div>
    </div>`;

    return htmlStr.trim();
};