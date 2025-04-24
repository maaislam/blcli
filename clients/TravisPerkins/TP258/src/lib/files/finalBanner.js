import { arrowIcon } from './data';

export const finalBanner = (id) => {

    const htmlStr = `
    <div class="${id}__banner-container">
        <div class="${id}__banner">
            <div class="${id}__banner-wrapper">
                <div class="main-banner-content item01">
                    <div class="banner-content banner-content_one">Find product fast using your order history and our
                        categories</div>
                    <div class="banner-arrow banner-arrow_one">${arrowIcon}</div>
                </div>
                <div class="main-banner-content item02">
                    <div class="banner-content banner-content_two">Look out for the yellow flags for your agreed trade
                        prices</div>
                    <div class="banner-arrow banner-arrow_two">${arrowIcon}</div>
                </div>
                <div class="main-banner-content item03">
                    <div class="banner-content banner-content_three">Remember to select collection or delivery. Add your
                        postcode to see accurate stock.</div>
                    <div class="banner-arrow banner-arrow_three">${arrowIcon}</div>
                </div>
                <div class="main-banner-content item04">
                    <div class="banner-content banner-content_four">Keep track as you build your basket.</div>
                    <div class="banner-arrow banner-arrow_four">${arrowIcon}</div>
                </div>
            </div>
            <div class="${id}__banner-close">
                <div class="close-btn">CLOSE</div>
            </div>
        </div>
    </div>`;

    return htmlStr.trim();
};