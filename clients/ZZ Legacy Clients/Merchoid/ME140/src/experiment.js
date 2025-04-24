import { fullStory, events } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';


const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'ME140',
    VARIATION: '1',
  },

  globals: {
    carousels: [],
  },

  init: function init() {
    // Setup
    const { settings, services, globals } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    document.body.classList.add(settings.ID + settings.VARIATION);
    const URL = window.location.pathname;
    const brandWidget = document.getElementById('brands-widget');
    if (URL.indexOf('brand') > -1 && settings.VARIATION === '1') {
      brandWidget.querySelector('.textwidget').style.display = 'none';
    }

    // create the new carousels
    const brandLabels = document.querySelectorAll('#brands-widget .gallery-cell');
    brandLabels.forEach((item) => {
      // change titles to match array
      if (item.querySelector('a').getAttribute('title') === 'The Legend of Zelda') {
        item.querySelector('a').setAttribute('title', 'Legend of Zelda');
      }
      if (item.querySelector('a').getAttribute('title') === 'Playstation') {
        item.querySelector('a').setAttribute('title', 'PlayStation');
      }
      if (item.querySelector('a').getAttribute('href').indexOf('/brand/rick-and-morty/') > -1) {
        item.querySelector('a').setAttribute('title', 'Rick and Morty');
      }
    });

    // set the order that the carousels should be in
    const gamingOrder = ['Legend of Zelda', 'Nintendo', 'PlayStation', 'Super Mario Bros.', 'Sonic the Hedgehog', 'Destiny', 'Fallout', 'Overwatch', 'Assassins Creed', 'Resident Evil', 'Street Fighter', 'Pokemon', 'Kingdom Hearts', 'Blizzard', 'Square Enix'];
    const movieOrder = ['Star Wars', 'Rick and Morty', 'Harry Potter', 'Game of Thrones', 'Pokemon', 'Disney'];
    const comicOrder = ['DC Comics', 'Black Panther', 'Marvel', 'Spider-man', 'Batman', 'Captain America', 'Guardians of the Galaxy', 'Wonder Woman', 'Harley Quinn', 'X-Men', 'Deadpool', 'The Flash', 'Superman', 'The Avengers', 'Suicide Squad', 'The Walking Dead'];
    if (settings.VARIATION === '1' && URL.indexOf('/brand/') > -1) {
      const brand = document.querySelector('[property="og:brand"]').content.replace('\'', '');
      const type = services.getCategoryType(brand);
      /* create new brand bar */
      const newBrandBar = document.createElement('div');
      newBrandBar.classList.add('ME140-newBar');
      newBrandBar.innerHTML = '<div class="ME140_brands"></div>';

      brandWidget.appendChild(newBrandBar);
      // loop through the brands in widget
      brandLabels.forEach((item) => {
        const brandLabelTitle = item.querySelector('a').getAttribute('title');
        const category = services.getCategorybrandType(brandLabelTitle);
        if (category === type) {
          const newBrandBarBrands = newBrandBar.querySelector('.ME140_brands');
          if (type === 'gaming') {
            gamingOrder.forEach((element) => {
              const gamingDiv = document.querySelector(`[title="${element}"]`).parentNode;
              newBrandBarBrands.appendChild(gamingDiv);
            });
          }
          if (type === 'moviesTV') {
            movieOrder.forEach((element) => {
              const movieDiv = document.querySelector(`[title="${element}"]`).parentNode;
              newBrandBarBrands.appendChild(movieDiv);
            });
          }
          if (type === 'comics') {
            comicOrder.forEach((element) => {
              const comicDiv = document.querySelector(`[title="${element}"]`).parentNode;
              newBrandBarBrands.appendChild(comicDiv);
            });
          }
        }
      });

      // change the new bar
      const newBrandLogos = newBrandBar.querySelectorAll('.gallery-cell');
      newBrandLogos.forEach((logo) => {
        logo.removeAttribute('style');
        logo.addEventListener('click', () => {
          const logoName = logo.querySelector('a').getAttribute('title');
          events.send('ME140 Brand Bar V1', 'Brand Clicked', `${type}:${logoName}`, { sendOnce: true });
        });
      });
      // eslint-disable-next-line no-undef
      const flkty = new Flickity(newBrandBar.querySelector('.ME140_brands'), { // eslint-disable-line no-unused-vars
        contain: true,
        pageDots: false,
        wrapAround: true,
        cellAlign: 'left',
      });
    }

    // VARIATION 2
    if (settings.VARIATION === '2' && (URL.indexOf('/stuff/') > -1 || document.body.classList.contains('home'))) {
      const newIconBar = document.createElement('div');
      newIconBar.classList.add('ME140_icons');
      newIconBar.innerHTML = `<div class="ME140-tabs">
      <div id ="ME140-gaming-carousel" class="ME140-icon_button ME140-gaming ME140-icon_active">Gaming</div>
      <div id ="ME140-comic-carousel" class="ME140-icon_button ME140-comic">Comics</div>
      <div id ="ME140-movie-carousel" class="ME140-icon_button ME140-movies">Movies & TV</div>
      <div class="ME140-slider"></div>
      </div>
      <div class="ME140-carousel ME140-gaming-carousel ME140-carousel-active"></div>
      <div class="ME140-carousel ME140-comic-carousel"></div>
      <div class="ME140-carousel ME140-movie-carousel"></div>`;
      brandWidget.appendChild(newIconBar);

      const gamingCarousel = document.querySelector('.ME140-gaming-carousel');
      const comicCarousel = document.querySelector('.ME140-comic-carousel');
      const movieCarousel = document.querySelector('.ME140-movie-carousel');

      gamingOrder.forEach((item) => {
        const gamingDiv = document.querySelector(`[title="${item}"]`).parentNode;
        gamingCarousel.appendChild(gamingDiv);
      });
      movieOrder.forEach((item) => {
        const movieDiv = document.querySelector(`[title="${item}"]`).parentNode;
        movieCarousel.appendChild(movieDiv);
      });

      comicOrder.forEach((item) => {
        const comicDiv = document.querySelector(`[title="${item}"]`).parentNode;
        comicCarousel.appendChild(comicDiv);
      });
      brandWidget.querySelector('.textwidget').remove();

      poller([
        () => { return (typeof window.Flickity !== 'undefined'); }, // eslint-disable-line arrow-body-style
      ], services.carouselSlider());

      // brand click event
      const newBrandLogos = document.querySelectorAll('.gallery-cell');
      newBrandLogos.forEach((logo) => {
        logo.addEventListener('click', () => {
          const logoName = logo.querySelector('a').getAttribute('title');
          events.send('ME140 Brand Bar V2', 'Brand Clicked', `${logoName}`, { sendOnce: true });
        });
      });
    }
    // toggle the carousels on click
    const iconTabs = document.querySelectorAll('.ME140-icon_button');
    for (let i = 0; i < iconTabs.length; i += 1) {
      iconTabs[i].addEventListener('click', (e) => {
        for (let j = 0; j < iconTabs.length; j += 1) {
          iconTabs[j].classList.remove('ME140-icon_active');
        }
        e.currentTarget.classList.add('ME140-icon_active');
        // Remove active class from all but one clicked
        [].forEach.call(document.querySelectorAll('.ME140-carousel'), (item) => {
          item.classList.remove('ME140-carousel-active');
        });
        // Make one carousel active
        const { id } = e.currentTarget;
        events.send('ME140 Brand Bar V2', 'Category Clicked', `${id}`, { sendOnce: true });
        const matchingElm = document.querySelector(`.${id}`);
        matchingElm.classList.add('ME140-carousel-active');
        globals.carousels.forEach((item) => {
          item[1].resize();
        });
      });
    }
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
    },

    carouselSlider: function carouselSlider() {
      const { globals } = Experiment;
      const carousels = document.querySelectorAll('.ME140-carousel');
      carousels.forEach((item) => {
        // eslint-disable-next-line no-undef
        globals.carousels.push([item, new Flickity(item, { // eslint-disable-line no-unused-vars
          contain: true,
          pageDots: false,
          wrapAround: true,
          cellAlign: 'left',
        })]);
      });
      setTimeout(() => {
        globals.carousels.forEach((item) => {
          item[1].resize();
        });
      }, 1000);
    },

    /**
     * @param {String} brand
     * @returns {String|undefined}
     */
    getCategoryType: function getCategoryType(brand) {
      let brandCategory;
      const brandCategories = {
        gaming: ['Legend of Zelda', 'Nintendo', 'PlayStation', 'Super Mario Bros.', 'Sonic the Hedgehog', 'Destiny', 'Fallout', 'Overwatch', 'Assassins Creed', 'Resident Evil', 'Street Fighter', 'Pokemon', 'Kingdom Hearts', 'Sega', 'Blizzard', 'Square Enix'],
        moviesTV: ['Star Wars', 'Rick and Morty', 'Harry Potter', 'Game of Thrones', 'Pokemon', 'Disney', 'Attack on Titan'],
        comics: ['DC Comics', 'Black Panther', 'Marvel', 'Spider-man', 'Batman', 'Justice League', 'Captain America', 'Guardians of the Galaxy', 'Wonder Woman', 'Harley Quinn', 'Iron Man', 'X-Men', 'Deadpool', 'The Flash', 'Superman', 'Thor', 'The Punisher', 'The Avengers', 'The Hulk', 'Suicide Squad', 'The Walking Dead'],
      };
      for (let i = 0; i < Object.keys(brandCategories).length; i += 1) {
        const data = Object.entries(brandCategories)[i];
        const key = data[0];
        const category = data[1];

        if (category.indexOf(brand) > -1) {
          brandCategory = key;
          break;
        }
      }

      return brandCategory;
    },
    /**
     * @param {String} brand
     * @returns {String|undefined} Category type or undefined if not found
     */
    getCategorybrandType: function getCategorybrandType(brandLabelTitle) {
      let brandCategory;
      const brandCategories = {
        gaming: ['Legend of Zelda', 'Nintendo', 'Playstation', 'Super Mario Bros.', 'Sonic the Hedgehog', 'Destiny', 'Fallout', 'Overwatch', 'Assassins Creed', 'Resident Evil', 'Street Fighter', 'Pokemon', 'Kingdom Hearts', 'Sega', 'Blizzard', 'Square Enix'],
        moviesTV: ['Star Wars', 'Rick and Morty', 'Harry Potter', 'Game of Thrones', 'Pokemon', 'Disney', 'Attack on Titan'],
        comics: ['DC Comics', 'Black Panther', 'Marvel', 'Spider-man', 'Batman', 'Justice League', 'Captain America', 'Guardians of the Galaxy', 'Wonder Woman', 'Harley Quinn', 'Iron Man', 'X-Men', 'Deadpool', 'The Flash', 'Superman', 'Thor', 'The Punisher', 'The Avengers', 'The Hulk', 'Suicide Squad', 'The Walking Dead', 'Infinity War'],
      };

      for (let i = 0; i < Object.keys(brandCategories).length; i += 1) {
        const data = Object.entries(brandCategories)[i];
        const key = data[0];
        const category = data[1];

        if (category.indexOf(brandLabelTitle) > -1) {
          brandCategory = key;
          break;
        }
      }
      return brandCategory;
    },
  },

  components: {},
};

export default Experiment;
