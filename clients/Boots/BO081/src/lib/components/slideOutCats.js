import {
  pollerLite
} from "../../../../../../lib/utils";
import shared from "../shared";
import catData from "./carouselData";

export default () => {

  const {
    ID
  } = shared;

  // create markup
  Object.keys(catData).forEach((i) => {
    const data = catData[i];

    const contentEl = document.createElement('div');
    contentEl.classList.add(`${ID}-contentWrapper`);
    contentEl.setAttribute(`name`, [i][0]);
    contentEl.innerHTML =
      `<div class="${ID}-contentInner">
            <div class="${ID}-title"><div class="${ID}-back"><span>Back</span></div>${data.name}</div>
            <div class="${ID}-content">
                <div class="${ID}-offers"></div>
                <h3>${data.name} categories</h3>
                <div class="${ID}-innerBlocks">
                    <div class="${ID}-lineBreak"></div>
                    <a class="${ID}__button ${ID}__primary" href="${data.allLink}">${data.buttonText}</a>
                </div>
            </div>
        </div>`;

    // add categories
    Object.keys(data.categories).forEach((x) => {
      const block = data.categories[x];
      const blockEL = document.createElement('a');
      blockEL.classList.add(`${ID}-block`);
      blockEL.setAttribute('href', block.link);

      blockEL.innerHTML =
        `<div class="${ID}-icon" style="background-image:url(${block.v3Icon})"></div><p>${[x][0]}</p>`;
      contentEl.querySelector(`.${ID}-innerBlocks .${ID}-lineBreak`).insertAdjacentElement('beforebegin', blockEL);
    });

    document.body.append(contentEl);
  });

  const removeActive = () => {
    const activeContent = document.querySelectorAll(`.${ID}-contentWrapper.${ID}-active`);
    if (activeContent) {
      [...activeContent].forEach((el) => {
        el.classList.remove(`${ID}-active`);
        document.body.classList.remove(`${ID}-noScroll`);
      });
    }
  }
  const allBanners = document.querySelectorAll(`.${ID}_maincategory`);
  for (let index = 0; index < allBanners.length; index += 1) {
    const element = allBanners[index];
    if (element.getAttribute('data-target')) {
      element.addEventListener('click', (e) => {
        removeActive();
        const elTarget = e.currentTarget.getAttribute('data-target');
        const matchingEl = document.querySelector(`.${ID}-contentWrapper[name=${elTarget}]`);
        if (matchingEl) {
          document.body.classList.add(`${ID}-noScroll`);
          matchingEl.classList.add(`${ID}-active`);
        }
      });
    }
  }

  const allBackArrows = document.querySelectorAll(`.${ID}-contentWrapper .${ID}-back`);
  for (let x = 0; x < allBackArrows.length; x += 1) {
    const el = allBackArrows[x];
    if (el) {
      el.addEventListener('click', () => {
        window.scrollTo(0, 0);
        removeActive();
      });
    }
  }

  const offerCarousels = () => {
    // pull in offers from department pages
    const request = new XMLHttpRequest();
    request.open('GET', 'https://www.boots.com/beauty', true);
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        const temp = document.createElement('html');
        temp.innerHTML = request.responseText;
        console.log(temp.querySelector('.heroCarousel'));

        const carousel = temp.querySelector('.heroCarousel');

        if (carousel) {
          document.querySelector(`.${ID}-contentWrapper[name="beautyskincare"] .${ID}-offers`).appendChild(carousel);
        }
      }
    };
    request.send();

    // pull in offers from department pages
    const healthrequest = new XMLHttpRequest();
    healthrequest.open('GET', 'https://www.boots.com/health-pharmacy', true);
    healthrequest.onload = () => {
      if (healthrequest.status >= 200 && healthrequest.status < 400) {
        const temp = document.createElement('html');
        temp.innerHTML = healthrequest.responseText;
        console.log(temp.querySelector('.heroCarousel'));

        const carousel = temp.querySelector('.heroCarousel');

        if (carousel) {
          document.querySelector(`.${ID}-contentWrapper[name="healthpharmacy"] .${ID}-offers`).appendChild(carousel);
        }
      }
    };
    healthrequest.send();


    pollerLite([`.${ID}-contentWrapper .heroCarousel`], () => {
      // loop through and set the images

      const allSlides = document.querySelectorAll(`.${ID}-contentWrapper .heroCarousel .rel img`);
      for (let index = 0; index < allSlides.length; index += 1) {
        const element = allSlides[index];
        const imageSmall = element.getAttribute('data-imagesml');
        const largeImage = element.getAttribute('data-imagelrg');

        if (window.innerWidth >= 767) {
          element.setAttribute('src', largeImage);
        } else {
          element.setAttribute('src', imageSmall);
        }
      }

      window.jQuery(`.${ID}-contentWrapper .heroCarousel`).slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
      });
    });
  }

  offerCarousels();
}