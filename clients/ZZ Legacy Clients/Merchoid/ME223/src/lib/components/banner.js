import shared from '../shared';

const { ID, VARIATION } = shared;

export default class ScarcityBanner {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }


  create() {

    const loaderBar = 
    `<div class="${ID}-loaderBar_wrapper">
      <p>Current stock levels:</p>
        <div class="${ID}-loaderBar">
         <span></span>
         <div class="${ID}-stockLevel">
          <span class="${ID}-arrow"></span>
          Low Stock
         </div>
        </div>
    </div>`;


    let bannerHeading;
    let bannerText;
    let jumperText;
    let jumperHeader;

    if(window.location.href.indexOf('/uk/') > -1) {
      jumperText = 'jumpers';
      jumperHeader = 'JUMPERS';
    }
    else if(window.location.href.indexOf('/eu/') > -1) {
      jumperText = 'jumpers';
      jumperHeader = 'JUMPERS';
    }
    else {
      jumperText = 'sweaters';
      jumperHeader = 'SWEATERS';
    }


    if(shared.VARIATION === '1') {
        bannerHeading = "BUY NOW BEFORE THEY'RE SOLD OUT";
        bannerText = "We only make low quantities of our licensed, knitted Christmas "  + jumperText + " and because they're exclusive to us, that means when they're sold out they're really gone!";
    } else {
        bannerHeading = 'WARNING! OUR '  + jumperHeader + ' ARE SELLING FAST!';
        bannerText = "Don't hang around! Last year, over 90% of our exclusive Christmas "  + jumperText + " sold out. Make sure you don't miss out and order yours today!";
    }
    
    const element = document.createElement('div');
    element.classList.add(`${ID}_scarcityBanner`);
    element.innerHTML = 
    `
    <h3>${bannerHeading}</h3>
    ${shared.VARIATION === '2' ? `${loaderBar}` : ''}
    <p>${bannerText}</p>`
    this.component = element;
  }

  bindEvents() {
    const { component } = this;

    if(VARIATION === '2') {
        // check when the scarcity banner is in view to animate it
        const bannerHeight = component.clientHeight;

        // check if element is in view
        const inView = () => {
            
            const windowHeight = window.innerHeight;
            const scrollY = window.scrollY || window.pageYOffset;
            
            // get current scroll position (distance from the top of the page to the bottom of the current viewport)
            const scrollPosition = scrollY + windowHeight;
            // get element position (distance from the top of the page to the bottom of the element)
            const bannerPosition = component.getBoundingClientRect().top + scrollY + bannerHeight;
            
            // is scroll position greater than element position?
            if (scrollPosition > bannerPosition) {
                return true;
            }
    
            return false;
        }

        // animate element when it is in view
        const animate = () => {
            if (inView()) {
                component.classList.add(`${ID}-loader_slide`);
            }
        }

         // listen for scroll event and call animate function
         document.addEventListener('scroll', animate);

    }

  }

  render() {
    const { component } = this;
    // const fourthProduct = document.querySelectorAll('.gender-banner-products .item')[3];
    const fourthProduct = document.querySelector('#star-wars-christmas-sweaters');
    fourthProduct.insertAdjacentElement('afterend', component);
  }
}

