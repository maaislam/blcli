/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { elementIsInView } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

/**
 * Get products
 */
const getProducts = () => {
  const prodElms = document.querySelectorAll('.product-list-item');

  const prods = {};

  [].forEach.call(prodElms, p => {
    const titleElm = p.querySelector('.product-list-item__title');
    const linkElm = p.querySelector('a');

    if(titleElm && linkElm) {
      const title = titleElm.innerText.trim();
      const href = linkElm.pathname.trim();

      prods[title + location.pathname] = {
        title: title,
        link: href,
        element: p
      };
    }
  });

  return prods;
};

/**
 * Make prod carousel
 */
const makeProdCarousel = (element, data) => {
  const imageElm = element.querySelector('.product-list-item-image');
  if(imageElm) {
    imageElm.innerHTML = '';

    const carousel = document.createElement('div');

    carousel.classList.add(`${shared.ID}-carousel`);

    if(data['Image 1']) {
      carousel.insertAdjacentHTML('beforeend', `
        <img data-ref="main" src="${data['Image 1']}">
      `);
    }
    if(data['Image 2']) {
      carousel.insertAdjacentHTML('beforeend', `
        <img data-ref="lifestyle" src="${data['Image 2']}">
      `);
    }
    if(data['Image 3']) {
      carousel.insertAdjacentHTML('beforeend', `
        <img data-ref="cut-out" src="${data['Image 3']}">
      `);
    }
    if(data['Image 4']) {
      carousel.insertAdjacentHTML('beforeend', `
        <img data-ref="pack" src="${data['Image 4']}">
      `);
    }
    if(data['Image 5']) {
      carousel.insertAdjacentHTML('beforeend', `
        <img data-ref="claim" src="${data['Image 5']}">
      `);
    }

    imageElm.insertAdjacentElement('afterbegin', carousel);

    // Initial Carousel
    const opts = {
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      dots: true,
      autoplay: false,
      speed: 250,
      adaptiveHeight: false,
      autoplaySpeed: 4500,
      prevArrow: '<button class="slick-prev slick-arrow"><span class="icon-regular-chevron-left"></span></button>',
      nextArrow: '<button class="slick-next slick-arrow"><span class="icon-regular-chevron-right"></span></button>',
    };

    jQuery(carousel).slick(opts);
    jQuery(carousel).on('afterChange', (e, f) => {
      const slide = f.$slides[f.currentSlide];
      if(slide) {
        const img = slide.querySelector('img');
        if(img) {
          const ref = img.getAttribute('data-ref');

          fireEvent(`Slideto | ${f.currentSlide + 1} | ${ref}`);
        }
      }
    });

    // Handle img click
    jQuery(carousel).on('click', '.slick-slide', e => {
      const newImg = e.currentTarget.querySelector('img[data-ref]');
      if(newImg) {
        fireEvent(`Click | ${jQuery(carousel).slick('slickCurrentSlide') + 1} | ${newImg.getAttribute('data-ref')}`);
      }
    });
  }
};

const getData = () => {
  return new Promise((res, rej) => {
    const keyName = `${shared.ID}-data-v20220404`; // Rename the key if data changes to force clear caches

    const localData = localStorage.getItem(keyName);
    if(localData) {
      res(localData);
    } else {
      fetch(`https://blcro.fra1.digitaloceanspaces.com/ne324.json?v=${keyName}`)
      .then(response => response.json())
      .then(data => {
        const d = JSON.stringify(data);
        localStorage.setItem(keyName, d);

        res(d);
      });
    }
  });
};

/**
 * Entry point
 */
export default () => {
  getData().then(stringData => {
    const data = JSON.parse(stringData);

		setup();

		fireEvent('Conditions Met');

		const element = document.querySelector('.section .columns');

		if(element) {
			if(elementIsInView(element, false)) {
				fireEvent('In View', true);
			}

			window.addEventListener('scroll', debounce(() => {
				if(elementIsInView(element, false)) {
					fireEvent('In View', true);
				}
			}, 100));
		}

		if(VARIATION == 'control') {
			return;
		}

		const prods = getProducts();
		for(let p in prods) {
			if(data[p]) {
				prods[p].element.classList.add('xmatches');

				makeProdCarousel(prods[p].element, data[p]);
			}
		}

		[].forEach.call(document.querySelectorAll('.product-list-item > a'), p => {
			p.addEventListener('click', e => {
				if(e.target.closest('.slick-next')) {
					e.preventDefault();
					e.stopPropagation();
				}
				if(e.target.closest('.slick-prev')) {
					e.preventDefault();
					e.stopPropagation();
				}
				if(e.target.closest('.slick-dots')) {
					e.preventDefault();
					e.stopPropagation();
				}
			});
		});
	});
  
};
