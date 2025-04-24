/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { events, pollerLite } from '../../../../../lib/utils';

export default () => {
  setup();

  events.send('AF Attraqt', 'AF Recom Artists');

  let productPrice = (window.AF?.product_obj?.price) || '0';

  productPrice = productPrice.replace(/[^\d\.]+/g, '');

  (function(w){
    if(!w._ebq || w._ebq.length == 0) {
      w._ebq = w._ebq || [];
      w._ebq.push(['init', '5f8022d7e2860b852a15a1ba']);
      var profile = {};
      w._ebq.push(['identify', profile]);
      var elt = document.createElement('script'); elt.type = 'text/javascript'; elt.async = true;
      elt.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.early-birds.fr/earlybirds-full.min.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(elt, s);
    }
  })(window);

  var widgetToLoad = '602fdf658ff7293dac23bf1b';

  const variables =  {
    '$MinProductPrice': (productPrice * .5).toFixed(2),
    '$MaxProductPrice': (productPrice * 2 ).toFixed(2),
  };

  const productCatLink = document.querySelector('#product-detail-page .af-underline-links a[href*=product_category]');
  if(productCatLink && productCatLink.innerText.trim()) {
    let resultSubcat = productCatLink.innerText.trim();

    const replacements = /\(Giclée\)/ig;
    resultSubcat = resultSubcat.replace(replacements, '').trim();

    variables['$Subcategory'] = 'subcat_' + resultSubcat;
  }

  const styleLink = document.querySelector('#product-detail-page a[href*=art\\/style]');
  if(styleLink && styleLink.innerText.trim()) {
    variables['$style'] = styleLink.innerText.trim();
  }

  const sizeText = document.querySelector('#product-detail-page ul.af-underline-links');
  if(sizeText && sizeText.innerText.trim()) {
    const sizeTextMatch = sizeText.innerText.trim().match(/Size: ([\d\.]+) x ([\d\.]+)( x ([\d\.]+))?/i);
    if(sizeTextMatch && sizeTextMatch[1] && sizeTextMatch[2]) {
      const max = Math.max(sizeTextMatch[1], sizeTextMatch[2], (sizeTextMatch[4] || 0));

      if(max >= 200) {
        variables['$SizeCategory'] = 'large'; // the 'size_category' is not 'XL' in the feed
      } else if(max > 150) {
        variables['$SizeCategory'] = 'large';
      } else if(max > 100) {
        variables['$SizeCategory'] = 'medium';
      } else {
        variables['$SizeCategory'] = 'small';
      }

    }
  }

  (function(w){
    if( !w._ebq || !w._ebq.eb || !(widgetToLoad in ((((w._ebq.eb || {}).ebWidgets || {}).widgets) || '')) ) {
    w._ebq = w._ebq || [];
    w._ebq.push(['loadWidget', {
      type: 'recommendations',
      variables: variables,
      widgetId: widgetToLoad
    }]);
    }
  })(window);


  pollerLite([() => !!window.jQuery], () => {
    
    let $ = null;
    $ = window.jQuery;

    const locale = document.documentElement.getAttribute('lang') || 'en-gb';

    const addElement = (list) => {
      const ref = document.querySelector('#products-by-artist');
      ref.insertAdjacentHTML('beforeend', `
        ${(list?.recommendations || []).length > 0 ? `
          <div class='eb-wrapper'>
            <h3 class='eb-title af-super af-line-height-s af-super-xxl'>
              Art we think you'll love
            </h3>
            <div class='eb-recommendations af-products-carousel af-square-product-cards af-grid-s'>
              ${list?.recommendations.map((itm) => (
                `<div class='eb-recommendation' data-product-id="${itm.product._id.original_id}">
                  <div class='af-column'>
                      <div class='af-place-container margin margin-xxs'>
                          <div class='af-card af-card-product-variant af-show-element-on-hover'>
                              <div class='af-place-container'>
                                <a href="${itm.product.url}" class='eb-imageLink'></a>
                                  <figure class='af-overflow-hidden' style='padding-top: 100%'>
                                    ${itm.product.photo ? `
                                      <img class='eb-product-img small-12 af-place place-top' src="${itm.product.photo}" alt='' style='opacity: 1;'>
                                    ` : `
                                    `}
                                      
                                  </figure>
                              </div>
                              <div class='eb-product-infos af-card-padding af-white-bg clearfix'>
                                  <a href="${itm.product.url}" class='eb-product'>
                                      <p class='margin margin-s margin-bottom  af-picasso60-text'>${itm.product.artist_name}</p>
                                      <p class='af-truncate-text margin margin-none af-picasso60-text'>${itm.product.sub_category || itm.product.category}</p>
                                      
                                      <p class='left margin margin-none medium-7 large-10'>
                                          <span class=''>${
          new Intl.NumberFormat(locale, { style: 'currency', currency: window.AF?.product_obj?.currency || 'GBP', maximumFractionDigits: 0, minimumFractionDigits: 0 })
            .format(itm.product.currencies[window.AF?.product_obj?.currency] / 100).replace(/[,\.]/g, '')
                                            }</span>
                                      
                                      </p>
                                  </a>
                              </div>
                              <a href="${itm.product.url}" class='eb-product'></a>
                          </div> 
                      </div>
                  </div>
              </div>`
              )).join(' ')}
            </div>
          </div>
        ` : ''}
      `);
    }

    // const addElement = () => {
      
    //   const ref = document.querySelector('#products-by-artist');

    //   const templateHTML = Object.keys(window._ebq?.eb?.ebWidgets?.widgets)[0];
    //   const thing = window._ebq?.eb?.$();
    //   // ref.insertAdjacentHTML('beforeend', );
    // }

    const variablesUrl = encodeURIComponent(JSON.stringify(variables));

    fetch(`https://api.early-birds.io/widget/602fdf658ff7293dac23bf1b/recommendations/ca618de9-647d-4cbe-a332-ad1fb5c36a73?variables=${variablesUrl}`)
    .then(response => response.json())
    .then(data => {
      addElement(data);

      $.getScript( "https://cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js", () => {
      
      $('.eb-recommendations').slick({
        swipe: true,
        touchMove: true,
        draggable: true,
        infinite: false,
        dots: true,
        autoplay: false,
        slidesToShow: 4,
        vertical: false,
        slidesToScroll: 1,
        slidesToScroll: 1,
        swipeToSlide: true,
        touchThreshold: 9999,
        useCSS: true,
        useTransform: true,
        prevArrow: `<button type="button" data-role="none" class="slick-prev slick-arrow slick-disabled" aria-label="Previous" role="button" aria-disabled="true" style="display: block;"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="position: absolute; height: 100%; width: 100%; left: 0; top: 0;">
        <circle class="arrow-slider-circle" cx="12" cy="12" r="11.5" fill="none" stroke="#8C8C8C"></circle>
        <path class="arrow-slider-shape" fill="#8C8C8C" d="M10.5088835 12l3.3080582-3.02451041c.2440777-.22315674.2440777-.5849653 0-.80812204-.2440776-.22315673-.6398058-.22315673-.8838834 0L9.18305826 11.595939c-.24407768.2231567-.24407768.5849653 0 .808122l3.75000004 3.4285714c.2440776.2231568.6398058.2231568.8838834 0 .2440777-.2231567.2440777-.5849653 0-.808122L10.5088835 12z"></path>
    </svg></button>`,
        nextArrow: `<button type="button" data-role="none" class="slick-next slick-arrow slick-disabled" aria-label="Next" role="button" aria-disabled="true" style="display: block;"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="position: absolute; height: 100%; width: 100%; left: 0; top: 0;">
        <circle class="arrow-slider-circle" cx="12" cy="12" r="11.5" fill="none" stroke="#8C8C8C"></circle>
        <path class="arrow-slider-shape" fill="#8C8C8C" d="M10.5088835 12l3.3080582-3.02451041c.2440777-.22315674.2440777-.5849653 0-.80812204-.2440776-.22315673-.6398058-.22315673-.8838834 0L9.18305826 11.595939c-.24407768.2231567-.24407768.5849653 0 .808122l3.75000004 3.4285714c.2440776.2231568.6398058.2231568.8838834 0 .2440777-.2231567.2440777-.5849653 0-.808122L10.5088835 12z"></path>
    </svg></button>`,
        responsive: [
          {
            breakpoint: 1025,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: "60px",
              dots: false,
              infinite: true,
              slidesToScroll: 1,
              slidesToShow: 4,
            }
          },
          {
            breakpoint: 736,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: "60px",
              infinite: true,
              slidesToScroll: 1,
              slidesToShow: 1,
            }
          },
          // {
          //   breakpoint: 479,
          //   settings: {
          //     slidesToShow: 2,
          //   }
          // }
        ]
      });
      
    });

    setTimeout(() => {
      var getDivs = document.querySelectorAll('.eb-product-infos p.margin.margin-s');
    //Find out how my divs there are with the class 'match-height' 
    var arrayLength = getDivs.length;
    var heights = [];
  
    //Create a loop that iterates through the getDivs variable and pushes the heights of the divs into an empty array
    for (var i = 0; i < arrayLength; i++) {
        heights.push(getDivs[i].offsetHeight);
    }
  
     //Find the largest of the divs
    function getHighest() {
      return Math.max(...heights);
    }
  
    //Set a variable equal to the tallest div
    var tallest = getHighest();
  
    //Iterate through getDivs and set all their height style equal to the tallest variable
    for (var i = 0; i < getDivs.length; i++) {
      if (tallest > 0) {
        getDivs[i].style.minHeight = tallest + "px";
      }
    }
    }, 1000);
    })
    .catch((err) => console.error(err));

    // fetch('https://api.early-birds.io/widget/602fdf658ff7293dac23bf1b/recommendations/99042ff6-1673-4fd3-88dd-ad81c73c0640', (obj) => {
    //   console.log({obj})
    // });

    
  })
};


