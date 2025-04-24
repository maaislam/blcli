/**
 * IDXXX - Description
 * 1. Get product URL
 * 2. Get current version of product
 * 3. Fetch images against the above
 * 4. Observe variation change and re run above.
 * 5. Replace current pictures in slide
 * 6. Re set slider if needed.
 * @author User Conversion
 */
import { cacheDom } from '../../../../../lib/cache-dom';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';
import { setup } from './services';
import settings from './settings';
import { fixSelect } from './helpers/fixSelect';
import getDetails from './helpers/getDetails';
import getImages from './helpers/getImages';
import swapUrl from './helpers/swapUrl';
import { cloneThumb } from './helpers/cloneThumb';

events.analyticsReference = '_gaUAT';

const activate = () => {

  setup();

  // Device
  let device = window.innerWidth < 747 ? 'mobile' : 'desktop';

  // Cache
  const colourSelect = cacheDom.get('#divColour select#dnn_ctr176031_ViewTemplate_ctl00_ctl11_colourDdl');
  let thumbnails = cacheDom.getAll('#piThumbList li');
  let productImage = cacheDom.get('#pnlMainProductImage');
  const colourId = getDetails.getColour(colourSelect);
  const productUrl = getDetails.getUrl();
  const thumbWrap = cacheDom.get('#divShowAlternateImges');

  // Control
  if (settings.VARIATION == '2') {
    // Events
    events.send(settings.ID, 'Control', 'Control is active');
    events.send(settings.ID, 'Control', `Images shown on ${productUrl}`);
    return false;
  }

  /**
   * Select currently doesn't remove the attribute
   * selected="selected" on the opton elements.
   */
  fixSelect(colourSelect);
  const hasMap = getDetails.checkMap(productUrl, colourId);

  if (hasMap) {
    // For slider and thumbnails
    let upCount = 0; // Max = thumbnailImgArr
    
    /**
     * @desc Optional (unless changing variation).
     * @param {String} variationID 
     */
    const swapImages = (variationID) => {
      let colourID = colourId;
      variationID ? colourID = variationID : colourId;
      let newMap;
      let thumbImgs;
      let modelData;
      thumbnails = document.querySelectorAll('#piThumbList li');
      productImage = document.querySelector('#pnlMainProductImage');
      if (variationID) {
        newMap = getDetails.checkMap(productUrl, variationID);
        // Swap Thumbnails
        thumbImgs = getImages.fetchThumbs(newMap);
        // Add model data
        modelData = getImages.fetchModel(newMap);

        // Remove added arrows
        if (document.querySelector('.ImgBtnNext') || document.querySelector('.ImgBtnPrev')) {
          const prevButtonsToRemove = document.querySelectorAll('.ImgBtnPrev');
          const nextButtonsToRemove = document.querySelectorAll('.ImgBtnNext');
          for (let i = 0; prevButtonsToRemove.length > i; i += 1) {
            prevButtonsToRemove[i].parentElement.removeChild(prevButtonsToRemove[i]);
            nextButtonsToRemove[i].parentElement.removeChild(nextButtonsToRemove[i]);
          }
        }
      } else {
        thumbImgs = getImages.fetchThumbs(hasMap);
        // Add model data
        modelData = getImages.fetchModel(hasMap);
      }
      
      if (!thumbImgs) return;

      for (let i = 0; thumbnails.length > i; i += 1) {
        cloneThumb(thumbnails[i], thumbImgs[i]);
        // swapUrl(thumbnails[i], thumbImgs[i]);
      }

      /**
       * Edit all ID's to suit, currently they are duplicated.
       */
      thumbnails = document.querySelectorAll('#piThumbList li');

      for (let i = thumbnails.length; i >= 0; i -= 1) {
        const thisThumb = thumbnails[i];
        if (thisThumb) {
          const thisAnchor = thisThumb.querySelector('a');
          const thisImg = thisThumb.querySelector('a img');
          thisThumb.setAttribute('id', `dnn_ctr176031_ViewTemplate_ctl00_ctl00_rptAlternateImages_ctl0${i}_liControl`);
          thisAnchor.setAttribute('id', `dnn_ctr176031_ViewTemplate_ctl00_ctl00_rptAlternateImages_ctl0${i}_apiThumb1`);
          thisImg.setAttribute('id', `dnn_ctr176031_ViewTemplate_ctl00_ctl00_rptAlternateImages_ctl0${i}_piThumbImg`);
          thisImg.classList.remove('piActiveThumb');
          // Add Image Swap
          thisAnchor.addEventListener('click', (e) => {
            e.preventDefault();
            const mainImage = document.querySelector('#productImages #productImageContainer .productImage img#imgProduct');
            if (mainImage) {
              for (let i = 0; thumbnails.length > i; i += 1) {
                const thisThumbImg = thumbnails[i].querySelector('img');
                if (thisThumbImg && thisThumbImg.classList.contains('piActiveThumb')) {
                  thisThumbImg.classList.remove('piActiveThumb');
                }
              }
              thisImg.classList.add('piActiveThumb');
              swapUrl(mainImage, thisAnchor.getAttribute('href'));
              upCount = i;
            }
          });
        }
      }
      // Weird fix for the first thumbnail
      


      /**
       * Edit max thumb attribute
       */
      if (thumbWrap) {
        thumbWrap.setAttribute('thumbimgstodisplay', thumbnails.length);
      }

      // Swap main image
      let mainImagesArr;
      if (variationID) {
        mainImagesArr = getImages.fetchMain(newMap, device);
      } else {
        mainImagesArr = getImages.fetchMain(hasMap, device);
      }

      let mainProductImg = document.querySelector('#productRollOverPanel img');
      let mainImageContainer = document.getElementById('productRollOverPanel');
      swapUrl(mainProductImg, mainImagesArr[2]);
      

      // Swap zoom image. Each time you hover...
      mainProductImg.addEventListener('mouseover', () => {
        pollerLite(['#zoomMainImagePanel img'], () => {
          const zoomEl = document.querySelector('#zoomMainImagePanel img');
          swapUrl(zoomEl, mainProductImg.getAttribute('src'));
        });
      });


      // Couldn't remove or sort the current slider functionality
      // So instead just hidden the current arrows and replace with my own.
      const nextButton = document.querySelector('#dnn_ctr176031_ViewTemplate_ctl00_ctl01_ctl00_pnlMainImageNextButton');
      const prevButton = document.querySelector('#dnn_ctr176031_ViewTemplate_ctl00_ctl01_ctl00_pnlMainImagePrevButton');
      if (nextButton && prevButton) {
        nextButton.parentElement.removeChild(nextButton);
        prevButton.parentElement.removeChild(prevButton);
      }

      let sliderContainer = document.querySelector('#pnlMainProductImage');
      // Add new arrows
      sliderContainer.insertAdjacentHTML('beforeend', `
        <div id="FL058-prev" class="ImgBtnPrev">
              
          <span class="FL058prev">
              <span class="glyphicon glyphicon-chevron-left"></span>
          </span>

        </div>
        <div id="FL058-next" class="ImgBtnNext">
          
          <span class="FL058next">
              <span class="glyphicon glyphicon-chevron-right"></span>
          </span>

        </div>
      `);

      const newSliderContainer = document.querySelector('#pnlMainProductImage');
      const currentMainImage = newSliderContainer.querySelector('img');
      let thumbnailImgArr = document.querySelectorAll('#piThumbList li > a');


      const nextBtn = document.querySelector('#FL058-next');
      const prevBtn = document.querySelector('#FL058-prev');

      
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (upCount === thumbnailImgArr.length - 1) return;
        for (let i = 0; thumbnailImgArr.length > i; i += 1) {
          const thumbImg = thumbnailImgArr[i].querySelector('img');
          const imgDot = thumbnailImgArr[i].querySelector('.imgdot');
          if (thumbImg && thumbImg.classList.contains('piActiveThumb')) {
            thumbImg.classList.remove('piActiveThumb');
          }
          if (imgDot && imgDot.classList.contains('piActiveDot')) {
            imgDot.classList.remove('piActiveDot');
          }
        }
        
        if (thumbnailImgArr && thumbnailImgArr[upCount]) {
          let newUrl = thumbnailImgArr[upCount + 1].getAttribute('href');
          let thumbImgEl = thumbnailImgArr[upCount + 1].querySelector('img');
          let imgDot = thumbnailImgArr[upCount + 1].querySelector('.imgdot');
          if (!newUrl) {
            newUrl = thumbnailImgArr[upCount].getAttribute('href');
            thumbImgEl = thumbnailImgArr[upCount].querySelector('img');
          }
          if (!imgDot) {
            imgDot = thumbnailImgArr[upCount].querySelector('.imgdot');
          }
          swapUrl(currentMainImage, newUrl);
          thumbImgEl.classList.add('piActiveThumb');
          if (imgDot) {
            imgDot.classList.add('piActiveDot');
          }
          upCount += 1;
          if (upCount === thumbnailImgArr.length) {
            upCount = 0;
          }
        }
      });

      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (upCount === 0) return;
        for (let i = 0; thumbnailImgArr.length > i; i += 1) {
          const thumbImg = thumbnailImgArr[i].querySelector('img');
          const imgDot = thumbnailImgArr[i].querySelector('.imgdot');
          if (thumbImg && thumbImg.classList.contains('piActiveThumb')) {
            thumbImg.classList.remove('piActiveThumb');
          }
          if (imgDot && imgDot.classList.contains('piActiveDot')) {
            imgDot.classList.remove('piActiveDot');
          }
        }
        
        if (thumbnailImgArr && thumbnailImgArr[upCount]) {
          let newUrl = thumbnailImgArr[upCount - 1].getAttribute('href');
          let thumbImgEl = thumbnailImgArr[upCount - 1].querySelector('img');
          let imgDot = thumbnailImgArr[upCount - 1].querySelector('.imgdot');
          // Do the swap
          swapUrl(currentMainImage, newUrl);
          // Classes
          thumbImgEl.classList.add('piActiveThumb');
          if (imgDot) {
            imgDot.classList.add('piActiveDot');
          }
          if (imgDot) {
            imgDot.classList.add('piActiveDot');
          }
          upCount -= 1;
          if (upCount === thumbnailImgArr.length) {
            upCount = 0;
          }
        }
      });

      // Stop swiping functionaity. Replace with large transparent click sides
      const swipeContainer = document.querySelector('.pinch-zoom-container');
      if (swipeContainer) {
        swipeContainer.addEventListener('touchmove', (e) => {
          e.preventDefault();
        });
      }

      
      observer.connect(mainProductImg, () => {
        // Swap zoom image. Each time you hover...
        mainProductImg.addEventListener('mouseover', () => {

          pollerLite(['#zoomMainImagePanel img'], () => {
            const zoomEl = document.querySelector('#zoomMainImagePanel img');

            swapUrl(zoomEl, mainProductImg.getAttribute('src'));
          });
        });
        
      }, {
        config: {
          attributes: true,
          childList: false,
          subtree: false,
        }
      });

      // Add model data
      const modelRef = document.querySelector('.productDescription .pd-accordion .acc-title');
      if (modelRef) {
        modelRef.insertAdjacentHTML('afterbegin', modelData);
      }

      // Events
      events.send(settings.ID, 'Variation', `Images shown on ${productUrl}`);
      // Active class for thumbnails
      const updatedThumbs = document.querySelectorAll('#piThumbList li');
      const firstThumb = updatedThumbs[0];
      const firstThumbImg = firstThumb.querySelector('img');
      const imgDots = document.querySelectorAll('#piThumbList .imgdot');
      if (firstThumbImg) {
        firstThumbImg.classList.add('piActiveThumb')
      }
      if (imgDots) {
        for (let i = 0; imgDots.length > i; i += 1) {
          imgDots[i].classList.remove('piActiveDot');
        }
        imgDots[0].classList.add('piActiveDot');
      }
    }
    swapImages();
    

    // Re run swap Images on variation change
    colourSelect.addEventListener('change', (e) => {
      // Remove model info
      const modelInfo = document.querySelector('.FL058-size-model');
      if (modelInfo) {
        modelInfo.parentElement.removeChild(modelInfo);
      }
      setTimeout(() => {
        const colourCode = e.target.value;
        // pollerLite(['#piThumbList li a img', '#pnlMainProductImage a img'], );
        swapImages(colourCode);
        upCount = 0;
      }, 500);
    });
  }
};

export default activate;
