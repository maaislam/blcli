import { fullStory, events, poller } from '../../../../../lib/utils';
import { pollerLite } from '../../../../../lib/uc-lib';
import settings from './settings';

const { ID, VARIATION } = settings;

let productVars;
/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
}


function showErrorMessage(messageToShow, ref) {
  if (messageToShow && ref) {
    ref.insertAdjacentHTML('beforeend', `
      <div class="SD051-error SelectSizePopover popover bottom in">
        <div class="arrow"></div>
        <span class="glyphicon glyphicon-warning-sign"></span>
        <p>${messageToShow}</p>
      </div>
    `);
  }
}

function showSuccessMessage(messageToShow, ref) {
  if (messageToShow && ref) {
    ref.insertAdjacentHTML('beforeend', `
      <div class="SD051-success">
        <p>${messageToShow}</p>
      </div>
    `);
  }
}


/**
 * @desc Adds the 'Quick View' link to each product
 * @param {ElementArray} products
 */
function addQuickView(products) {
  if (products.length) {
    Array.from(products).map((product) => {
      if(product.classList.contains('SD048-card')) {
        return;
      }
      const productRef = product.querySelector('.productimage.s-productthumbimage');
      const link = product.querySelector('.ProductImageList').getAttribute('href');
      if (productRef && link) {
        if (!product.querySelector('.SD051-quickview')) {
      
          productRef.insertAdjacentHTML('afterend', `
            <div class="SD051-quickview">
              <a href="${link}"><span class="SD051-qv-icon"></span> <span class="SD051-quickview-text">Quick view</span></a>
            </div>
          `);
        }
      }
    });
  }
}

/**
 * @desc To run on click. Will fetch the product details from PDP
 * and pass the result to the callback function.
 * @param {String} link
 * @param {Function} cb
 */
function fetchProductDetails(link, cb) {
  
  if (link) {
    const request = new XMLHttpRequest();
    request.open('GET', link, true);

    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        const data = request.responseText;
        // const sizeVariantId = request.responseURL;
        if (data) {
          const html = document.createElement('div');

          const colorCodeMatcher = link.match(/colcode=(\d+)/i);
          let colCode = '';
          if(colorCodeMatcher && colorCodeMatcher[1]) {
            colCode = colorCodeMatcher[1];
          }

          html.innerHTML = data;
          
          let allImgs = html.querySelectorAll('img');
          
          let images = html.querySelectorAll('img.piThumb');
          // let images = html.querySelectorAll('#piThumbList li a img');
          images = [].slice.call(images).map((img) => {
            let imgRent = img.parentElement;
            let url = '';
            // console
            let src = imgRent.getAttribute('href');

            const origColCode = img.getAttribute('data-imgcolourid');
            if(origColCode) {
              url = src.replace(origColCode, colCode);
            }

            return url;
          });
          
          let personalisation = html.querySelector('#pnlPersonalisation') ? true : false;

          const productObj = {
            title: html.querySelector('#productDetails .title h1'),
            price: html.querySelector('.pdpPriceRating .pdpPrice span'),
            code: html.querySelector('#lblProductCode'),
            chosenColCode: colCode,
            info: html.querySelector('.infoTabPage'),
            options: html.querySelector('.productVariantContainer'),
            atb: html.querySelector('.BasketWishContainer .addToBasketContainer'),
            images: images,
            personalisation: personalisation,
            sizeVariantId: html.querySelectorAll('.productVariantContainer .ProductDetailsVariants'),
            variants: html.querySelectorAll('.productVariantContainer .ProductDetailsVariants'),
            link,
          };

          cb(productObj);
        }
        
      } else {
        // We reached our target server, but it returned an error

      }
    };

    request.onerror = () => {
      // There was a connection error of some sort
    };

    request.send();
  }
}

/**
 * @desc Builds up and adds the popup to the related product element.
 * @param {Object} elObj
 * @param {Element} product
 */
function popup(elObj, product) {
  if (elObj && product) {
    const ref = product.parentElement.parentElement.parentElement;

    // Image slider
    const slider = document.createElement('div');
    slider.classList.add('SD051-slider');
    for (let i = 0; elObj.images.length > i; i += 1) {
      let src;
      if (typeof elObj.images[i] === 'string') {
        src = elObj.images[i];         
      } else {
        src = elObj.images[i].getAttribute('src');
      }
      
      
      const imgEl = document.createElement('div');
      imgEl.innerHTML = `
        <img src="${src}" alt="product image"/>
      `;
      slider.insertAdjacentElement('beforeend', imgEl);
    }

    // Get Size Variant ID
    const variantData = elObj.sizeVariantId;
    // Set global product vars
    productVars = JSON.parse(variantData[0].dataset.variants);

    let vsID;
    let allVariants;

    if (variantData) {
      allVariants = JSON.parse(variantData[0].dataset.variants);
      vsID = allVariants[0].SizeVariants[0].SizeVarId;
    }

    // Reduce text length to excerpt
    const string = elObj.info.innerHTML;
    let excerpt = string.substr(0, 235);
    excerpt = excerpt.substr(0, Math.min(excerpt.length, excerpt.lastIndexOf(' ')));
    
    // Add popup
    if (ref) {
      ref.insertAdjacentHTML('beforebegin', `
        <div data-svid="${vsID}" class="SD051-popup">
          <div class="SD051-popup--close">
            <div>
              <span></span>
              <span></span>
            </div>
          </div>
          <div class="SD051-popup--title">
            ${elObj.title.outerHTML}
            <div class="price">${elObj.price.outerHTML}</div>

            
          </div>

          <div class="SD051-img--slider">
            <div class="SD051-prev"><span></span></div>
            ${slider.outerHTML} 

            <div class="SD051-next"><span></span></div>
          </div>

          <div class="SD051-info">
            
            ${elObj.personalisation == true 

              ? 

              `
              <div class="SD051-options" id="productDetail">
                <a href="${elObj.link}" id="personalised-product-link" class="view-product">View Product</a>
              </div>
              `

              :

              `
              <div class="SD051-options" id="productDetail">
                <input type="hidden" name="chosenColour" id="chosenColour" value="${elObj.chosenColCode}" />
                ${elObj.options.outerHTML}

                <a href="${elObj.link}" class="all-details">View full product details</a>
              </div>

              `}
            
          </div>
        </div>
      `);

      if(elObj && elObj.chosenColCode) {
        const select = document.querySelector('.SD051-info .SD051-options select#colourDdl');
        
        if(select) {
          select.value = elObj.chosenColCode;
        }
      }
    }

    // Add image slider function
    
    pollerLite([() => {
      let run = false;
      if (window.jQuery) {
        $ = window.jQuery;
        run = true;
      }
      return run;
    }], () => {
      $.loadScript = (url, callback) => {
        $.ajax({
          url,
          dataType: 'script',
          success: callback,
          async: true,
        });
      };
      const $slider = $('.SD051-popup .SD051-slider');
      
      if ($slider) {
        $.loadScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', () => {
          
          $($slider).slick({
            dots: true,
            arrows: true,
            prevArrow: $('.SD051-prev'),
            nextArrow: $('.SD051-next'),
          });
      
        });
      }
      const sliderWrap = document.querySelector('.SD051-popup .SD051-img--slider');
      sliderWrap.addEventListener('click', (e) => {
        if (e.target.classList.contains('SD051-prev') || e.target.classList.contains('SD051-next')) {
          events.send(settings.ID, 'Click', 'Navigated through images');
        }
      });

      const popupSelect = document.querySelector('.SD051-popup select.SizeDropDown');
      // On single size products, remove 'disabled' so a size can be chosen.

      if(popupSelect) {

        if (popupSelect.classList.contains('aspNetDisabled')) {
          popupSelect.classList.remove('aspNetDisabled');
        }
        if (popupSelect.getAttribute('disabled')) {
          popupSelect.removeAttribute('disabled');
        }


      }
      
    });
  }
}

/**
 * @desc Closes said popup.
 * @param {Event} event
 * @param {Element} thisPopup
 */
function closePopup(event, thisPopup) {
  if (event.currentTarget) {
    // const thisPopup = document.querySelector('.SD051-popup');
    const popupPoppa = thisPopup.parentElement;
    if (thisPopup && popupPoppa) {
      popupPoppa.removeChild(thisPopup);
    }
  }
}

/**
 * @desc Sends POST request to add product to cart.
 * Requires Size Variant ID e.g. 54012401350
 * @param {String} sizeVariantId
 */
function addToBag(sizeVariantId, cb) {
  pollerLite([() => {
    let run = false;
    if (window.jQuery) {
      $ = window.jQuery;
      run = true;
    }
    return run;
  }], () => {
    $.ajax({
      type: 'POST',
      headers: {
        Accept: 'application/json, text/javascript, */*; q=0.01',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      url: 'https://www.sportsdirect.com/DesktopModules/BasketBag/API/BasketService/Add',
      data: {
        bagItems: `[{"sizeVariantId":"${sizeVariantId}","quantity":"1","personalisation":{},"isProductRec":false}]`,
      },
    }).done((result) => {
      cb(result);
    });
  });
}


function getProduct() {
  let reuturnedID;
  const currentID = document.querySelector('.SD051-popup').parentElement.getAttribute('li-productid');
  for (let i = 0; productVars.length > i; i += 1) {
    if (productVars[i].ColVarId === currentID) {
      reuturnedID = productVars[i];
    }
  }
  return reuturnedID;
}

function changeSize(e) {
  if (e.target.classList.contains('greyOut')) {
    return false;
  }
  const currentSize = e.currentTarget.value;
  const productObj = getProduct();
  let newSizeId;
  for (let i = 0; productObj.SizeVariants.length > i; i += 1) {
    if (productObj.SizeVariants[i].SizeName === currentSize) {
      newSizeId = productObj.SizeVariants[i].SizeVarId;
    }
  }
  const thisPopup = document.querySelector('.SD051-Popup');
  if (thisPopup) {
    thisPopup.setAttribute('data-svid', newSizeId);
  }
  return newSizeId;
}

function changeVariation(e) {
  e.preventDefault();
  const chosenVar = e.target.value;
  let newProductObj;
  const thisPopup = document.querySelector('.SD051-popup');
  if (thisPopup) {
    thisPopup.setAttribute('data-colid', chosenVar);
  }
  if (chosenVar) {
    for (let i = 0; productVars.length > i; i += 1) {
      if (productVars[i].ColVarId === chosenVar) {
        newProductObj = productVars[i];
      }
    }
  }
  // Amend size options to reflect new product
  const sizeSelect = document.querySelector('.SD051-popup .swapSize select.SizeDropDown');
  if (sizeSelect) {
    sizeSelect.innerHTML = `
      <option selected="selected" value="">Size</option>
    `;
    newProductObj.SizeVariants.map((sizeVar) => {
      sizeSelect.insertAdjacentHTML('beforeend', `
        <option value="${sizeVar.SizeName}" title="${sizeVar.SizeName}">${sizeVar.SizeName}</option>
      `);
    });
  }

  const noOfImgs = newProductObj.ProdImages.AlternateImages.length;
  if (noOfImgs > 0) {
    const $slider = $('.SD051-popup .SD051-slider');
    if ($slider) {
      $slider.slick('unslick');
    }
  }
  const imageSlider = document.querySelector('.SD051-popup .SD051-img--slider .SD051-slider');
  imageSlider.innerHTML = '';
  
  for (let i = 0; noOfImgs > i; i += 1) {
    imageSlider.insertAdjacentHTML('beforeend', `
      <div>
        <img src="${newProductObj.ProdImages.AlternateImages[i].ImgUrlLarge}" alt="${newProductObj.APopupZoomTitle}"/>
      </div>
    `);
  }
  $.loadScript = (url, callback) => {
    $.ajax({
      url,
      dataType: 'script',
      success: callback,
      async: false,
    });
  };
  const $newSlider = $('.SD051-popup .SD051-slider');
  if ($newSlider) {
    $.loadScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', () => {
      $newSlider.slick({
        dots: true,
        arrows: true,
        prevArrow: $('.SD051-prev'),
        nextArrow: $('.SD051-next'),
      });
    });
  }
  return newProductObj;
}

function showBag(result) {

    const addedProduct = result.BasketProductDetails[0];
    const basket = document.querySelector('#ulBag');
    const bagItems = document.querySelector('#divBagItems');
    const bagQty = document.querySelector('#bagQuantity');
    if (basket) {
      basket.insertAdjacentHTML('afterbegin', `
        <li id="li${addedProduct.VariantId}" class="liPrdLnk" data-prdurl="${addedProduct.ProductUrl}">
          <img src="${addedProduct.ProductImageUrl}" alt="Image of Product ${addedProduct.ProductName}" class="Baskimg">
          <div class="bagContentItemWrap">
            <div class="PriceandCross">
              <img src="/images/core/help-icn.jpg" alt="Help icon" title="Contains personalised items" style="display:none">
              <a id="removeItem" class="removeClass" productvariantitem="${addedProduct.VariantId}" removequantity="Qty: 1">X</a>
            </div>
            <span class="BaskName">${addedProduct.ProductName}</span>
            <div class="ColrandSize">
              <span class="BaskColr">${addedProduct.ProductColour}</span>
              <span class="BaskSize">${addedProduct.ProductSize}</span>
            </div>
              <span class="BaskQuant">Qty: 1</span>
              <span class="maxText"></span>
              <span class="BaskPrice">${addedProduct.ProductSellingPriceText}</span>
            <div class="lineProblems">
              <span class="outofstock"></span>
            </div>
          </div>
        </li>
      `);
      bagItems.classList.add('open');
      bagItems.style.display = 'block';
      if (bagQty) {
        if (bagQty.textContent && bagQty.classList.contains('empty')) {
          bagQty.classList.remove('empty');
        }
        let qtyNumber = parseInt(bagQty.textContent, 10);
        qtyNumber += 1;
        bagQty.textContent = qtyNumber;
      }
      setTimeout(() => {
        bagItems.classList.remove('open');
        bagItems.style.display = 'none';
      }, 4500);
    }
  
}


function fadeOutEl(el) {
  if (el) {
    $(el).fadeOut('slow', () => {
      const parent = el.parentElement;
      if (parent) {
        parent.removeChild(el);
      }
    });
  }
}

function addFunctionality(cachedLinks) {
  if (cachedLinks.length) {
    for (let i = 0; cachedLinks.length > i; i += 1) {
      const thisLink = cachedLinks[i].href;
      cachedLinks[i].addEventListener('click', (e) => {
        
        events.send(settings.ID, 'Click', 'Quickview link was clicked');
        e.preventDefault();
        fetchProductDetails(thisLink, (obj) => {
          
          // Product Variations Object
          const productVariations = JSON.parse(obj.variants[0].dataset.variants);
          // Build and add popup to screen
          popup(obj, cachedLinks[i]);
          events.send(settings.ID, 'Active', 'Quickview popup has been shown');

          const thisPopup = document.querySelector('.SD051-popup');

          // Disable body scroll
          document.body.classList.add('SD051-noscroll');

          const close = document.querySelector('.SD051-popup .SD051-popup--close');
          if (close) {
            close.addEventListener('click', (e) => {
              closePopup(e, thisPopup);
              // Enable body scroll
              document.body.classList.remove('SD051-noscroll');
              events.send(settings.ID, 'Click', 'Closed quick view popup');
            });
          }

          // Click outside of popup
          const bodyWrap = document.getElementById('BodyWrap');
          if (bodyWrap && thisPopup) {
            bodyWrap.addEventListener('click', (e) => {
              const isClickInside = thisPopup.contains(e.target);
              if (thisPopup) {
                if (!isClickInside) {
                  const poppa = thisPopup.parentElement;
                  if (poppa) {
                    poppa.removeChild(thisPopup);
                    // Enable body scroll
                    document.body.classList.remove('SD051-noscroll');
                  }
                }
              }
            });
          }

          // Add to bag functionality
          const atbCta = document.querySelector('.SD051-popup .ImgButWrap a');
          if (atbCta) {
            atbCta.addEventListener('click', (atbEvent) => {
              events.send(settings.ID, 'Click', 'Add to bag');
              // Get current size
              const sizeSelect = document.querySelector('.SD051-popup #productVariantAndPrice select.SizeDropDown');
              const chosenSize = sizeSelect.options[sizeSelect.selectedIndex].value;

              // No size, show message
              if (!chosenSize || chosenSize == 0) {
                showErrorMessage('Please select a size', atbCta);
                const errorMessage = thisPopup.querySelector('.SD051-error');
                if (errorMessage) {
                  setTimeout(() => {
                    fadeOutEl(errorMessage);
                  }, 3000);
                }
                return;

              }

              let chosenCol = document.querySelector('#chosenColour').value;

              const chosenColourVariation = productVariations.filter((colVar) => {
                return colVar.ColVarId === chosenCol;
              });

              // Get current size
              const chosenProductId = chosenColourVariation[0].SizeVariants.filter((sizeVar) => {
                return sizeVar.SizeName === chosenSize;
              });

              // Show updated bag
              const thisChosenProductId = chosenProductId[0].SizeVarId;
              addToBag(thisChosenProductId, ((result) => {
                showBag(result);
                // Show success message
                showSuccessMessage('Product added to bag.', bodyWrap);
                const successMessage = document.querySelector('.SD051-success');
                if (successMessage) {
                  setTimeout(() => {
                    fadeOutEl(successMessage);
                  }, 3000);
                }
              }));


              // Close it
              closePopup(atbEvent, thisPopup);

              // Disable body scroll
              document.body.classList.remove('SD051-noscroll');
              
            });
          }

          // Change size functionality


          $.ajax({
                  cache: true,
                  type: 'GET',
                  url: '/ProductDetail/GetColourVariantsForProduct',
                  data: {
                      productId: obj.chosenColCode,
                      selectedCurrency: 'GBP'
                  },
                  dataType: "json",
                  success(data) {


                let actualSizeDataReturned = data.variantsData;
                let sizeData;
                for (let j = 0; actualSizeDataReturned.length > j; j += 1) {
                  
                  if(actualSizeDataReturned[j].colVarId == obj.chosenColCode) {
                    sizeData = actualSizeDataReturned[j].sizeVariants;
                  }   

                }

                const changeSizeSelect = document.querySelector('#productVariantAndPrice select.SizeDropDown');
                if (changeSizeSelect) {
                    
                  // remove existing select options

                  const sizeOptions = changeSizeSelect.querySelectorAll('option');
                  if (sizeOptions.length) {
                    for (let j = 0; sizeOptions.length > j; j += 1) {
                      sizeOptions[j].parentElement.removeChild(sizeOptions[j]);
                    }
                  }

                  // re-add correct sizing options from ajax call to productcolourvariant

                  if(sizeData.length) {

                    if(sizeData[0].sizeName == "One Size") {
                      var opt = document.createElement('option');
                      opt.appendChild(document.createTextNode("One Size"));
                      opt.value = "One Size";
                      changeSizeSelect.disabled = true;
                      changeSizeSelect.appendChild(opt);
                    } else {
                      var starter = document.createElement('option');
                      starter.appendChild(document.createTextNode('Size'));
                      starter.value = '0';
                      changeSizeSelect.appendChild(starter);

                      for (let j = 0; sizeData.length > j; j += 1) {
                        var opt = document.createElement('option');
                        opt.appendChild(document.createTextNode(sizeData[j].sizeName));
                        opt.value = sizeData[j].sizeName;
                        changeSizeSelect.appendChild(opt);
                      }
                    }
                    

                  }

                  changeSizeSelect.addEventListener('change', (event) => {
                    changeSize(event);
                    events.send(settings.ID, 'Clicked', 'Size selection');
                  });
                }
             }
          });


          

          // Change variation (colour)
          const changeVariationSelect = document.querySelector('#divColour > select');
          if (changeVariationSelect) {
            changeVariationSelect.addEventListener('change', (ee) => {
              ee.preventDefault();
              changeVariation(ee);
              events.send(settings.ID, 'Click', 'Colour selection');
            });
          }

          // More info event
          const moreInfoLink = document.querySelector('.SD051 .SD051-popup .SD051-popup--title a.all-details');
          if (moreInfoLink) {
            moreInfoLink.addEventListener('click', () => {
              events.send(settings.ID, 'Click', 'View full details link');
            });
          }

          // Personalised Products event
          const ppLink = document.querySelector('.SD051 .SD051-popup #personalised-product-link');
          if (ppLink) {
            ppLink.addEventListener('click', () => {
              events.send(settings.ID, 'Click', 'View personalised products link');
            });
          }

        });
      });
    }
  }
}


export { setup, addQuickView, fetchProductDetails, popup, closePopup, addToBag, changeSize, getProduct, changeVariation, showBag, addFunctionality }; // eslint-disable-line
