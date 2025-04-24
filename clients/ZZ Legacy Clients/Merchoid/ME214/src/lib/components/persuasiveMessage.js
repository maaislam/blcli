import shared from '../shared';

const { ID, VARIATION } = shared;

export default class PersuasiveMessage {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    let title;
    let bannerText;
    let icon;
    let desktopText;

    if(VARIATION === '1') {
        icon = '//cdn.optimizely.com/img/6087172626/6db3f4287d8c408a9f423ad37ce7cabd.png';
        title = 'Be smart. Order now';
        bannerText = 'Popular sizes sell out early. Save the tears, order now.';
        desktopText = 'We’re known for our Christmas jumpers, which means popular sizes sell out early. Save the tears, order now.';
    } else if(VARIATION === '2') {
        icon = '//cdn.optimizely.com/img/6087172626/a3cf14f168924d3f90576a416151feb0.png';
        title = 'Be different, be you';
        bannerText = 'Buy early to stand out with fun, fresh designs from Merchoid';
        desktopText = 'Dodge the same, boring high street Xmas jumper. Be different; buy fun, fresh designs from Merchoid.';
    } else if(VARIATION === '3') {
        icon = '//cdn.optimizely.com/img/6087172626/0c482e3d215f46618a7a60ff70a38c1b.png';
        title = 'Forget the stress, your search ends here';
        bannerText = 'You’ve found the holy grail; a real knit, geeky Xmas jumper. Don’t wait, we sell out fast!';
        desktopText = 'Forget months of searching only to find all the good ones are gone. We’ve got high quality, real knit Christmas jumpers with killer geeky designs';
    }


    const element = document.createElement('div');
    element.classList.add(`${ID}_messageBlock`);
    element.innerHTML = `
      <span style="background-image: url(${icon})"></span>
      <div class="${ID}-message">
        <h3>${title}</h3>
        <p>${ window.innerWidth > 767 ? `${desktopText}` : `${bannerText}`}</p>
      </div>
      ${shared.VARIATION === '1' ? `
      <div class="${ID}-loader_bar">
        <span></span>
          <div class="${ID}-stockLevel">
            <span class="${ID}-arrow"></span>
             Low Stock
            </div>
        </div>` : ''}
    `;
    this.component = element;
  }

  bindEvents() {
    const { component } = this;

    if (shared.VARIATION === '1') {
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
    const basketForm = document.querySelector('.product-usps-wrapper');
    basketForm.insertAdjacentElement('afterend', component);
  }
}
