import { crossIcon } from '../files/data';
export const stickyBanner = (id) => {

    const arrowIcon = `https://blcro.fra1.digitaloceanspaces.com/GCOR032/text_icon_button.png`;
    const htmlStr = `
    <div class="${id}__sticky-banner-container">
        <div class="${id}__sticky-banner">
        <div class="${id}__sticky-banner-cross-icon">${crossIcon('sticky-cross-icon')}</div>
            <p><span>Learn</span><span>more about</span><span>GoCardless</span></p>
            <img src="${arrowIcon}" alt="arrow-icon" class="arrow-icon">
        </div>
    </div>`;

    return htmlStr.trim();
};