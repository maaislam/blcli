/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { events } from '../../../../../lib/utils';
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();

  const { ID, VARIATION } = shared;

  const trackingSearch = () => {
    const searchIcon = document.querySelector('.site-controls__button--search .site-controls__trigger');
    searchIcon.addEventListener('click', () => {
      events.send(`${ID} variation:${VARIATION}`, 'click', 'search');
    });

    const searchForm = document.querySelector('.form.minisearch.site-search__form');
    searchForm.addEventListener('submit', () => {
      events.send(`${ID} variation:${VARIATION}`, 'submit', 'search form');
    });
  }

  const addToSearch = () => {
    const searchForm = document.querySelector('.form.minisearch.site-search__form');
    const newSearchContent = document.createElement('div');
    newSearchContent.classList.add(`${ID}-searchBox`);
    newSearchContent.innerHTML = `
    <div class="${ID}-close"></div>
    <div class="${ID}-searchForm">
      <h3>What are you looking for?</h3>
    </div>`;

    document.querySelector('.site-search').appendChild(newSearchContent);

    newSearchContent.querySelector(`.${ID}-searchForm`).appendChild(searchForm);

    // close search
    const close = document.querySelector(`.${ID}-searchBox .${ID}-close`);
    close.addEventListener('click', () => {
      document.querySelector('.site-controls__button--search .site-controls__trigger').click();
     // document.querySelector('.site-search.active').classList.remove('active');
      //document.body.removeAttribute('style');
      //document.querySelector('.site-overlay').classList.remove('active');

    });

  }

  const addPopularTerms = () => {

    const terms = {
      'Foil': {
        link: 'https://www.salonsdirect.com/hair-colour/bleach-foil/foil-and-dispensers',
      },
      'Wax': {
        link: 'https://www.salonsdirect.com/beauty/hair-removal/wax',
      },
      'Gloves': {
        link: 'https://www.salonsdirect.com/beauty/salon-consumables/gloves',
      },
      'Toner': {
        link: 'https://www.salonsdirect.com/hair/hair-care-perming/toners',
      },
      'Shampoo': {
        link: 'https://www.salonsdirect.com/hair/hair-care-perming/shampoo-conditioner-and-masks',
      },
    }

    const brands = {
      'Framar': {
        image: 'https://www.salonsdirect.com/media/wysiwyg/Framar_WebGrey_70x70.jpg',
        link: 'https://www.salonsdirect.com/brands/framar',
      },
      'Olaplex': {
        image: 'https://www.salonsdirect.com/media/Olaplex_copy.jpg',
        link: 'https://www.salonsdirect.com/brands/olaplex',
      },
      'Glitterbels': {
        image: 'https://www.salonsdirect.com/media/Glitterbels-centred.jpg',
        link: 'https://www.salonsdirect.com/brands/glitterbels',
      },
      'Pulp Riot': {
        image: 'https://cdn-sitegainer.com/81qtb3ulw1yjcn1.jpg',
        link: 'https://www.salonsdirect.com/brands/pulp-riot',
      },
      'Wella Professionals': {
        image: 'https://www.salonsdirect.com/media/wysiwyg/Wella_WebGrey_70x70.jpg',
        link: 'https://www.salonsdirect.com/brands/wella-professionals',
      },
      'Schwarzkopf BLONDME': {
        image: 'https://cdn-sitegainer.com/0pweyel8xttw41s.png',
        link: 'https://www.salonsdirect.com/brands/schwarzkopf-professional',
      },
    }

    const termsWrapper = document.createElement('div');
    termsWrapper.classList.add(`${ID}-termsBlock`);
    termsWrapper.innerHTML = `
    <div class="${ID}-terms">
      <h4>Popular terms:</h4>
      <div class="${ID}-links"></div>
    </div>
    <div class="${ID}-brands">
      <h4>Popular brands:</h4>
      <div class="${ID}-links"></div>
    </div>`;

    document.querySelector(`.${ID}-searchForm`).appendChild(termsWrapper);

    // add terms
    Object.keys(terms).forEach((i) => {
      const data = terms[i];
      const popTerm = document.createElement('a');
      popTerm.classList.add(`${ID}-buttonLink`);
      popTerm.setAttribute('href', data.link);
      popTerm.innerHTML = `<span>${[i][0]}</span>`;

      document.querySelector(`.${ID}-terms .${ID}-links`).appendChild(popTerm);
    });

     // add brands
     Object.keys(brands).forEach((i) => {
      const data = brands[i];
      const popBrand = document.createElement('a');
      popBrand.classList.add(`${ID}-brandLink`);
      popBrand.setAttribute('brand-name', [i][0]);
      popBrand.setAttribute('href', data.link);
      popBrand.style = `background-image: url(${data.image})`;

      document.querySelector(`.${ID}-brands .${ID}-links`).appendChild(popBrand);
    });

    // click events
    const allBrands = document.querySelectorAll(`.${ID}-brandLink`);
    for (let index = 0; index < allBrands.length; index += 1) {
      const element = allBrands[index];
      element.addEventListener('click', (e) => {
        const elName = e.currentTarget.getAttribute('brand-name');
        events.send(`${ID} variation:${VARIATION}`, 'click', `brand: ${elName}`);
      });
    }
    const allTerms = document.querySelectorAll(`.${ID}-terms a`);
    for (let index = 0; index < allTerms.length; index += 1) {
      const element = allTerms[index];
      element.addEventListener('click', (e) => {
        const termName = e.currentTarget.querySelector('span').textContent.trim();
        events.send(`${ID} variation:${VARIATION}`, 'click', `popular term: ${termName}`);
      });
    }
      
  }

  if(VARIATION === 'control') {
    trackingSearch();
  } else if( VARIATION === '1') {
    trackingSearch();
    addToSearch();
  } else if(VARIATION === '2') {
    trackingSearch();
    addToSearch();
    addPopularTerms();
  }
};
