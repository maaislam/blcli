import shared from "../shared";

const { ID } = shared;

export default () => {
    // Review banner changes
    const reviewBanner = () => {
        const reviewBlocks = document.querySelectorAll('.review-banner-conveyor-belt .slick-slide');
        for (let index = 0; index < reviewBlocks.length; index += 1) {
            const element = reviewBlocks[index];
            
            const stars = element.querySelector('.review-star-rating');
            const quote = element.querySelector('.review-quote');

            quote.insertAdjacentElement('beforebegin', stars);
            
        }
    }
    reviewBanner();

    // featured banner changes
    const featuredInBanner = () => {
        const featuredBanner = document.querySelector('.as-seen-block .review-banner-fade');
        featuredBanner.insertAdjacentHTML('afterbegin', `<span class="${ID}-featured_title">We've been featured in:</span>`);
        
        document.querySelector('.review-banner-text div:last-of-type').textContent = 'Fans say'
    }
    featuredInBanner();

    const officiallyLicensedBanner = () => {
        const brandLogo = document.querySelector('.official-licensed-product img');

        const officialBanner = document.createElement('div');
        officialBanner.classList.add(`${ID}-official_banner`);
        officialBanner.innerHTML = `<span style="background-image: url(${brandLogo.getAttribute('src')})"></span><p>Officially licensed merchandise</p>`;


        if(window.innerWidth > 767) {
            document.querySelector('.product-info-main').insertAdjacentElement('afterbegin', officialBanner);
        } else {
            document.querySelector('.review-fans').insertAdjacentElement('afterend', officialBanner);
        }
    }
    officiallyLicensedBanner(); 
}