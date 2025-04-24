import { fullStory, events } from '../../../../../lib/utils';
import settings from './settings';

const { ID, VARIATION } = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
}

const getDetails = (url) => {
  if (url) {
    const detailPromise = new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      
      request.open('GET', url, true);
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          // Success!
          const data = request.responseText;
          resolve(data);
        } else {
          // We reached our target server, but it returned an error
          reject();
        }
      };

      request.onerror = () => {
        // There was a connection error of some sort
      };
      request.send();
    });
    return detailPromise;
  }
};

const addBlurPoints = (listItem) => {
  const link = listItem.querySelector('h4.prod_name > a').href;
  const ref = listItem.querySelector('.prod_info');

  const html = `
    <div class="TP132d-info clearfix">
      <div class="TP132d-labels">
        <p>Height</p>
        <p>Length</p>
        <p>Width</p>
      </div>

      <div class="TP132d-data TP132d-blur-on">
        <button>Click to view</button>
        <p class="TP132d-Height">100 mm</p>
        <p class="TP132d-Length">2300 mm</p>
        <p class="TP132d-Width">250 mm</p>
      </div>
    </div>
  `;
  if (!listItem.querySelector('.TP132d-info')) {
    ref.insertAdjacentHTML('beforeend', html);
    events.send(settings.ID, 'Active', 'Test is active and components added', { sendOnce: true });
  }

  /**
   * Add click event to blured area
   */
  const addedBlurEle = listItem.querySelector('.TP132d-data');
  if (addedBlurEle) {
    addedBlurEle.addEventListener('click', () => {
      getDetails(link).then((results) => {
        /**
         * Remove pagespeed from causing errors.
         */
        const pagespeedReg = /pagespeed\.gp.\w.+/gmi;
        const regex = /(x)\w+\.\w+\.(pagespeed\.\w+.+)/gmi;
        if (results) {
          if (results.match(regex)) {
            results.replace(pagespeedReg, '');
          }

          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = results;
  
          const techInfo = tempDiv.querySelectorAll('#tab-techspecs .featureClass *');
          const widthRef = listItem.querySelector('.TP132d-Width');
          const heightRef = listItem.querySelector('.TP132d-Height');
          const lengthRef = listItem.querySelector('.TP132d-Length');
          // const thicknessRef = listItem.querySelector('.TP132d-Thickness');
          let returnedWidth = '';
          let returnedHeight = '';
          let returnedLength = '';
          // let returnedThickness = '';
  
          /**
           * Match and store values
           */
          Array.from(techInfo).find((elem) => {
            if (elem.textContent === 'Width') {
              returnedWidth = elem.nextElementSibling.textContent;
            }
            if (elem.textContent === 'Height') {
              returnedHeight = elem.nextElementSibling.textContent;
            }
            if (elem.textContent === 'Length') {
              returnedLength = elem.nextElementSibling.textContent;
            }
            // if (elem.textContent === 'Thickness') {
            //   returnedThickness = elem.nextElementSibling.textContent;
            // }
          });
          
          /**
           * Add returned values
           */
          widthRef.innerText = returnedWidth;
          heightRef.innerText = returnedHeight;
          // thicknessRef.innerText = returnedThickness;
          lengthRef.innerText = returnedLength;

          /**
           * Remove blur
           */
          addedBlurEle.classList.remove('TP132d-blur-on');
        }
      });
    });
  }
};

function imageZoom(imgEl, resultID) {
  var img, lens, result, cx, cy;
  img = imgEl;
  result = resultID;
  /*create lens:*/
  lens = document.createElement("DIV");
  lens.setAttribute("class", "img-zoom-lens");
  /*insert lens:*/
  img.parentElement.insertBefore(lens, img);
  /*calculate the ratio between result DIV and lens:*/
  cx = result.offsetWidth / lens.offsetWidth;
  cy = result.offsetHeight / lens.offsetHeight;
  /*set background properties for the result DIV*/
  result.style.backgroundImage = "url('" + img.src + "')";
  result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
  /*execute a function when someone moves the cursor over the image, or the lens:*/
  lens.addEventListener("mousemove", moveLens);
  img.addEventListener("mousemove", moveLens);
  /*and also for touch screens:*/
  lens.addEventListener("touchmove", moveLens);
  img.addEventListener("touchmove", moveLens);
  function moveLens(e) {
    var pos, x, y;
    /*prevent any other actions that may occur when moving over the image*/
    e.preventDefault();
    /*get the cursor's x and y positions:*/
    pos = getCursorPos(e);
    /*calculate the position of the lens:*/
    x = pos.x - (lens.offsetWidth / 2);
    y = pos.y - (lens.offsetHeight / 2);
    /*prevent the lens from being positioned outside the image:*/
    if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
    if (x < 0) {x = 0;}
    if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
    if (y < 0) {y = 0;}
    /*set the position of the lens:*/
    lens.style.left = x + "px";
    lens.style.top = y + "px";
    /*display what the lens "sees":*/
    result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
  }
  function getCursorPos(e) {
    var a, x = 0, y = 0;
    e = e || window.event;
    /*get the x and y positions of the image:*/
    a = img.getBoundingClientRect();
    /*calculate the cursor's x and y coordinates, relative to the image:*/
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /*consider any page scrolling:*/
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  }
}

const addImageZoom = () => {
  const productImgs = document.querySelectorAll('#products .row .prod .prod_img');
  if (productImgs.length) {
    for (let i = 0; productImgs.length > i; i += 1) {
      const img = productImgs[i].querySelector('img');
      if (!productImgs[i].querySelector('.TP132d-product-zoom')) {
        productImgs[i].insertAdjacentHTML('beforeend', `
          <div class="TP132d-hover-message">
            <p>Hover mouse to zoom</p>
          </div>
          <div class="TP132d-product-zoom"></div>
        `);
      }
      const zoomResult = productImgs[i].querySelector('.TP132d-product-zoom');
      imageZoom(img, zoomResult);
      // showZoom(img);
    }
  }
};

const addTracking = () => {
  const clickTracking = (el) => {
    if (el) {
      el.addEventListener('click', () => {
        events.send(settings.ID, 'Clicked', 'User clicked for more info');
      });
    }
  };
  
  const hoverTracking = (el) => {
    if (el) {
      el.addEventListener('mouseover', () => {
        events.send(settings.ID, 'Hover', 'User zooming on the image', { sendOnce: true });
      });
    }
  };
  // Amend 10/12/18 Add Qty tracking
  const qtyTracking = (el) => {
    if (el) {
      el.addEventListener('click', () => {
        events.send(settings.ID, 'Click', 'Quantity changed');
      });
    }
  };

  const products = document.querySelectorAll('#products .row .prod');
  if (products.length) {
    for (let i = 0; products.length > i; i += 1) {
      const moreInfoEls = products[i].querySelector('.TP132d-data');
      const imgEl = products[i].querySelector('.prod_img img');
      const qtyEl = products[i].querySelector('.tpQ_input');
      clickTracking(moreInfoEls);
      if (settings.VARIATION === '2') {
        hoverTracking(imgEl);
      }
      qtyTracking(qtyEl);
    }
  }
};

export { addBlurPoints };
export { setup }; // eslint-disable-line
export { getDetails };
export { addImageZoom };
export { addTracking };
