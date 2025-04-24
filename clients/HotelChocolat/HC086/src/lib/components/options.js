import shared from "../../../../../../core-files/shared";
import { colours, flakes, starterKits } from "../data";


/**
 * Create options
 */

const { ID, VARIATION } = shared;

export default () => {

    /**
     * 
     * @param {*} object - data object
     * @param {*} type - product type
     * @param {*} parentEl - element new items will be added to
     */
    const createOptions = (object, type, parentEl) => {

        Object.keys(object).forEach((i) => {
            const el = object[i];
            const newEl = document.createElement('div');
            newEl.classList.add(`${ID}-product`);
            newEl.classList.add(`${ID}-${type}`);
            newEl.setAttribute('prod-id', el.id);
            newEl.setAttribute('prod-name', [i][0]);
            newEl.innerHTML = 
            `
            <div class="${ID}-productimage" style="background-image:url(${el.image})"></div>
              <div class="${ID}-info">
                <p class="${ID}-name">${[i][0]}</p>
                ${el.wasPrice ? `
                <div class="${ID}-priceBlock">
                    <span class="${ID}-wasPrice">${el.wasPrice}</span> 
                    <span class="${ID}-price">${el.price}</span>
                </div>` : 
                `<span class="${ID}-price">${el.price}</span>`}
              </div>`;

            document.querySelector(parentEl).appendChild(newEl);
        });
    }

    // If data is done in the platform
    // createOptions(window.HCcolours, 'colour', `.${ID}-colours .${ID}-stepContent`);
    // createOptions(window.HCkits, 'kit', `.${ID}-kits .${ID}-stepContent`);
    // createOptions(window.HCflakes, 'flake', `.${ID}-flakesSlider .${ID}-carousel`);

    createOptions(colours, 'colour', `.${ID}-colours .${ID}-stepContent`);
    createOptions(starterKits, 'kit', `.${ID}-kits .${ID}-stepContent`);
    createOptions(flakes, 'flake', `.${ID}-flakesSlider .${ID}-carousel`);

    const slickFlakes = () => {
      window.jQuery(`.${ID}-flakesSlider .${ID}-carousel`).slick({
        slidesToShow: 3,
          slidesToScroll: 1,
          arrows: true,
          infinite: false,
          mobileFirst: true, 
          responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1
                }
              },
              
                {
                    breakpoint: 300,
                    settings: "unslick"
                },

              ]
      });
    }

    if(VARIATION === '1') {
      if(window.innerWidth >= 1024) {
        slickFlakes();
      }

      window.addEventListener('resize', () => {
        if(window.innerWidth >= 1024) {
          slickFlakes();
        } else {
          window.jQuery(`.${ID}-flakesSlider .${ID}-carousel`).slick('unslick');
        }
      });
    }
}