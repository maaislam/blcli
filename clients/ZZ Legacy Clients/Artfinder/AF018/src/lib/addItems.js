import shared from '../../../../../core-files/shared';
import getSlides from './getSlides';
const { ID, VARIATION } = shared;

const addItems = (recommendations) => {
    const pTags = document.querySelectorAll('p');
    const pTagTarget =  Array.prototype.filter.call(pTags, (p) => {
        return p.innerHTML == 'Shop original art from independent artists around the world.';
    })[0];
    const targetSection = pTagTarget.closest('section');
    targetSection.classList.add(`${ID}-section`);

    const slidesHTML = getSlides(recommendations);
    targetSection.insertAdjacentHTML('beforeend', `
        <div class="af-main-row ${ID}-section__slider-row">
            <h4 class="text-center af-normal-weight ${ID}-section__heading">Art we think you’ll love.</h4>
            <div class="af-products-carousel af-square-product-cards af-grid-xs ${ID}-slider">
                ${slidesHTML}
                <div class="${ID}-section__bottom">
                    <div class="${ID}-section__arrows">
                        <div class="${ID}-section__arrows-inner">
                            <button class="${ID}-slider-arrow-prev ${ID}-section__arrow ${ID}-section__arrow--prev">
                                <i class="${ID}-section__arrow-icon icon icon-arrow-rounded-left"></i>
                            </button>
                            <button class="${ID}-slider-arrow-next ${ID}-section__arrow ${ID}-section__arrow--next">
                                <i class="${ID}-section__arrow-icon icon icon-arrow-rounded-right"></i>
                            </button>
                        </div>
                    </div>
                    <span class="${ID}-slider-dots"></span>
                </div>
            </div>
        </div>
    `);
}

export default addItems;