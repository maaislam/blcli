import shared from "../../../../../../core-files/shared";

const { ID, VARIATION } = shared;

export default class Header {
    constructor() {
      this.create();
      this.bindEvents();

      if(VARIATION === '1' || VARIATION === '3') {
        if(window.innerWidth >= 1280) {
          this.addQuickLinks();
        }
      }

      this.render();
    }
  
    create() {
      const element = document.createElement('div');
      element.classList.add(`${ID}-header`);

      if(VARIATION === '3') {
        if(window.location.href === 'https://www.ernestjones.co.uk/' || window.location.href.indexOf('https://www.ernestjones.co.uk/?') > -1) {
          element.classList.add(`${ID}-transparent`);
      }
    }
      element.innerHTML = `
        <div class="${ID}-topBar"></div>
        <div class="${ID}-container">
          <div class="${ID}-left">
              <div class="${ID}-icon Nav__close"></div>
              <div class="${ID}-icon ${ID}-navToggle"></div>
              <div class="${ID}-quickLinks"></div>
              <div class="${ID}-icon ${ID}-searchToggle"></div>
          </div>
          <div class="${ID}-middle">
              <div class="${ID}-logo"><a href="/"></a></div>
          </div>
          <div class="${ID}-right">
              <div class="${ID}-icons">
              </div>
          </div>
        </div>
      `;
      this.component = element;

      const existingIcons = document.querySelector('.header .other-links');
      existingIcons.querySelector('.header__syte.js-syte-functionality').insertAdjacentHTML('afterend', `<div class="${ID}-icon ${ID}-searchToggle"></div>`);


      existingIcons.querySelector('.header__syte.js-syte-functionality').addEventListener('click', () => {
        document.querySelector(`.site-search`).shadowRoot.querySelector('.--syte-start-camera-upload.c-syte.syte').click();
      })
      // remove text from user icons
      existingIcons.querySelector('.user-status__link').textContent = '';
      element.querySelector(`.${ID}-icons`).appendChild(existingIcons);
    }
  
    bindEvents() {
      const { component } = this;
    }

    addQuickLinks () {
      const { component } = this;
    
      const links = {
        'general': {
            'Watches': 'https://www.ernestjones.co.uk/webstore/l/watches/',
            'Engagement': 'https://www.ernestjones.co.uk/webstore/l/engagement-rings/',
            'Jewellery': 'https://www.ernestjones.co.uk/webstore/jewellery.do',
        },
        'watches': {
            "Men's Watches": 'https://www.ernestjones.co.uk/webstore/l/mens-watches/',
            "Ladies's Watches": 'https://www.ernestjones.co.uk/webstore/l/ladies-watches/',
            "Luxury Watches": 'https://www.ernestjones.co.uk/webstore/l/luxury-watches/',
        },
        'engagement': {
            "Engagement Rings": 'https://www.ernestjones.co.uk/webstore/l/engagement-rings/',
            "Bridal Sets": 'https://www.ernestjones.co.uk/webstore/l/bridal-set-engagement-rings/',
        },
      }

      let linksToShow;

      if(window.location.href.indexOf('watches') > -1) {
        linksToShow = links.watches;
      } else if(window.location.href.indexOf('engagement') > -1) {
        linksToShow = links.engagement;
      } else {
        linksToShow = links.general;
      }

      Object.keys(linksToShow).forEach((i) => {
        const data = linksToShow[i];
        const link = document.createElement('a');
        link.className = `sg-cta text-cta`;
        link.setAttribute('href', data)
        link.innerHTML = `<span>${[i][0]}</span>`;

        component.querySelector(`.${ID}-quickLinks`).appendChild(link);
      });  
      
    }
  
    render() {
      const { component } = this;
      document.querySelector('.header').insertAdjacentElement('beforebegin', component);
    }
  }