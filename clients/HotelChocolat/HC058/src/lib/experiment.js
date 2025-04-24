import {
  setup,
  fireEvent
} from '../../../../../core-files/services';
import {
  pollerLite
} from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import addMenu from './addMenu';

export default () => {
  const {
    ID,
    VARIATION
  } = shared;

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...


  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  const reviewsExist = () => {
    return new Promise((resolve, reject) => {
      pollerLite(['#BVRRContainer .bv-content-item', '.bv-content-summary-body-text', '.bv-content-author-name .bv-author span', '.bv-content-top-review'], () => {
        document.documentElement.classList.add(`${ID}-hasReviews`);
        resolve();
        return true;
      });
    });

  }


  const carouselContent = () => {
    let content;

    const prodName = document.querySelector('#page_heading h1');

    if (VARIATION === '1') {
      content = `
      <h3>Want to Learn More About Our Flavours?</h3>
      <p>Click here to explore the chocolates included in this product.</p>
      <a class="${ID}-imageCTA">Explore Flavours</a>`;
    } else if (VARIATION === '2') {
      content = `
      <h3>Like what you see?</h3>
      <p>Why not add our <span>${prodName.textContent.trim()}</span> to bag?</p>
      <a class="${ID}-imageCTA">Add to bag</a>`;
    }

    return content;
  }

  const addContent = () => {


    const imageContent =
      `<div class="${ID}-imageBlock thumb">
      <div class="${ID}-imageContent">${VARIATION !== '3' ? carouselContent() : ''} </div>
    </div>`;

    window.jQuery('#thumbnails').slick('slickAdd', imageContent);
    window.jQuery('#thumbnails').slick('refresh');
    window.jQuery('#thumbnails').slick('resize');

    window.jQuery('#thumbnails').on('afterChange', function () {
      if (document.querySelector('.slick-current').classList.contains(`HC058-imageBlock`)) {
        fireEvent('Carousel Content Visible');
      }
    });


    if (VARIATION === '1') {

      const scrollToElement = (element) => {
        window.scroll({
          behavior: 'smooth',
          left: 0,
          top: element.getBoundingClientRect().top + window.scrollY - 100,
        });
      }

      const menulink = document.querySelectorAll(`.${ID}-imageBlock.thumb.slick-slide`);
      const menu = document.querySelector(`.${ID}-menu`);
      if (menulink && menu) {
        for (let index = 0; index < menulink.length; index++) {
          const element = menulink[index];
          element.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToElement(menu);
            fireEvent('Clicked Explore Flavours');
          });
        }
      }
    }

  }

  if (VARIATION === '1') {

    pollerLite(['.descSection3.additional.menu .component-content ul'], () => {
      addMenu();
      addContent();
      fireEvent('Visual menu prompt shown');
    });
    
    
  }

  if (VARIATION === '2') {
    addContent();

    const slideAddButtons = document.querySelectorAll(`.${ID}-imageBlock.thumb.slick-slide .${ID}-imageCTA`);
    const addToBag = document.querySelector(`#add-to-cart`);

    for (let index = 0; index < slideAddButtons.length; index += 1) {
      const addEl = slideAddButtons[index];
      addEl.addEventListener('click', () => {
        addToBag.click();
        fireEvent('Clicked add to bag');
      });
    }
  }


  if (VARIATION === '3') {

    reviewsExist().then(() => {

      fireEvent('Review in carousel shown');

      addContent();

      const getReview = () => {
        const reviewArr = [];
        const allReviews = document.querySelectorAll('#BVRRContainer .bv-content-item');
        for (let index = 0; index < allReviews.length; index += 1) {

          const element = allReviews[index];
          const authorName = element.querySelector('.bv-content-author-name .bv-author span');
          const reviewText = element.querySelector('.bv-content-summary-body-text p');

          const dataObj = {};
          if (reviewText) {
            dataObj['name'] = authorName;
            dataObj['reviewtext'] = reviewText;
          }

          reviewArr.push(dataObj);
          break;
        }
        return reviewArr;
      }


      const reviewData = getReview();
      // loop through them, one is cloned through slick;
      const reviewBlock = document.querySelectorAll(`.${ID}-imageContent`);
      for (let index = 0; index < reviewBlock.length; index++) {
        const element = reviewBlock[index];
        element.innerHTML = `
        <div class="${ID}-reviewBlock">
          <div class="${ID}-stars"></div>
            <h4><q>${reviewData[0].reviewtext.innerHTML.replace(/\n/g, " ").replace(/<br>/g, '. ')}</q></h4>
          <p><span>-</span> ${reviewData[0].name.textContent.trim()}</p>
        </div>`;
      }
    });
  }


};
