import usps from './usps';
import shared from './shared';
const { ID, VARIATION } = shared;

const getInnerHTML = (usp) => {
    return `
    <div class="${ID}-usps__title-wrap af-bold">
        <div class="${ID}-usps__title af-bold">
            <i class="icon icon-${usp.icon} ${ID}-usps__icon"></i>
            ${usp.title}
        </div>
    </div>
    <div class="${ID}-usps__text">
        ${usp.text}
    </div>`;
};

const getTrustpilotHTML = () => {
    return `
    <a href="https://uk.trustpilot.com/review/artfinder.com" target="_blank" class="${ID}-usps__trustpilot">
        <img src="https://ab-test-sandbox.userconversion.com/experiments/AF013-trustpilot.png" class="${ID}-usps__trustpilot-image" alt="Excellent - Trustpilot 4,113 reviews" />
    </a>
    `;
};

const buildSlides = (settings) => {
    let slidesHTML = '';
    usps.forEach((usp, index) => {
        let isEven = index % 2 == 0;
        let isTrustpilot = usp?.type == 'trustpilot';
        let innerHTML = isTrustpilot ? getTrustpilotHTML(usp) : getInnerHTML(usp);
        let thisSlideHTML = `
        <div class="${ID}-usps-slide ${ID}-usps__slide">
            <div class="${ID}-usps__slide-inner ${ID}-usps__slider-inner--${settings?.rows > 1 && isEven ? 'top' : 'default'}">
                ${innerHTML}
            </div>
        </div>
        `;
        slidesHTML = slidesHTML + thisSlideHTML;
    });
    return slidesHTML;
};

const buildUsps = (settings) => {
    let rowsAttribute = `data-rows="${settings?.rows ? settings.rows : 0}"`;
    let slidesAttribute = `data-slidesToShow="${settings?.slidesToShow ? settings.slidesToShow : 1}"`;
    let variableWidthAttribute = `data-variableWidth="${settings?.variableWidth ? settings.variableWidth : false}"`;
    return `
    <div class="${ID}-usps ${settings?.classes ? settings.classes : ''}" ${rowsAttribute} ${slidesAttribute} ${variableWidthAttribute}>
        ${buildSlides(settings)}
    </div>
    `;
};

export default buildUsps;