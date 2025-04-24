var POSITION_PREFIX = '1';
var DEFAULT_CURRENCY = '$';
var CURRENCY_SIGN = '${Currency Symbol}' || DEFAULT_CURRENCY;
var CURRENCY_POSITION = '${Currency Position}' || POSITION_PREFIX;
var SCREEN_WIDTH = window.innerWidth;
var apiVariantCache = {};

var container = document.getElementById('dy-recommendations-${dyVariationId}');
console.log(' container', container);
var sliderElement = container.getElementsByClassName('dy-recommendations__slider')[0];
var INJECTED_PRODUCTS = [].slice.call(container.querySelectorAll('.dy-recommendation-product')).length;

setResponsiveAttributes();
addCurrencyToPrices();
setTimeout(() => {
  renderProductData();
}, 3000);
swiperArrowEvents();

//addWindowResizeEvent();
//centerSwiperButtonOnProduct();

initSlider().then(function () {
  var slider = new Swiper(container.querySelector('.dy-recommendations__slider'), getSliderOptions()); // eslint-disable-line
});

function initSlider() {
  var SWIPER_JS_URL = 'https://cdn.dynamicyield.com/common/cs/swiper.js';

  return appendJSFile(SWIPER_JS_URL);
}

function renderProductData() {
  [].slice.call(container.getElementsByClassName('dy-recommendation-product')).forEach(function (product) {
    getShopifyId(product);
    // generateStarRatings(product);
    // generatePrices(product);
    // setA2cEvent(product);
    // setQuantityEvents(product);
    // setVariantEvents(product);
    // setUnitPrice(product);
    // parseBadges(product);
  });
}

function getShopifyId(product) {
  var productHandle = product.getAttribute('data-dy-url').split('?')[0].split('.com')[1];
  console.log('productHandle', productHandle);

  //fetch product detail from shopify
  fetch('' + productHandle + '.js', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      product.innerHTML = renderNewCard(data);
    });
}

//update this function

function renderNewCard(data) {
  var productCard =
    ' <div class="product-listing" data-product-id="' +
    data.id +
    '" style="width: 237px;" >\n<div class="product-image product-image-hover">\n      <a href="' +
    data.url +
    '" class="fixed-ratio square">\n          <img class="img-fluid default ls-is-cached lazyloaded" data-src="' +
    data['featured_image'] +
    '">\n\n              <span class="label-left text"><span class="clamp">Bestseller!</span></span>\n\n              <div class="badge-banner-mobile" style="color:#FFFFFF;background:#2D3A73">Perfect Stocking Filler!</div>\n          \n      <img class="img-fluid secondary-image ls-is-cached lazyloaded" data-src="//cdn.shopify.com/s/files/1/0327/1498/1421/products/87674_Skin_So_Soft_2_365x.jpg?v=1611677565" width="365" height="365" src="//cdn.shopify.com/s/files/1/0327/1498/1421/products/87674_Skin_So_Soft_2_365x.jpg?v=1611677565"></a>\n  </div><!-- product-image -->\n  <div class="product-details">\n      <h3 class="product-title"><a href="' +
    data.url +
    '" title="' +
    data.title +
    '" tabindex="0">' +
    data.title +
    '</a></h3>\n      \n   <div class="yotpo bottomLine yotpo-small" data-product-id="5246620663853" data-url="https://avon.uk.com/products/skin-so-soft-original-dry-oil-spray" data-yotpo-element-id="2"> <div class="yotpo-display-wrapper" aria-hidden="true" style="visibility: hidden;">  <div class="standalone-bottomline" data-source="default"> <div class="yotpo-bottomline pull-left  star-clickable" tabindex="0">  <span class="yotpo-stars"> <span class="yotpo-icon yotpo-icon-star rating-star pull-left"></span><span class="yotpo-icon yotpo-icon-star rating-star pull-left"></span><span class="yotpo-icon yotpo-icon-star rating-star pull-left"></span><span class="yotpo-icon yotpo-icon-star rating-star pull-left"></span><span class="yotpo-icon yotpo-icon-half-star rating-star pull-left"></span><span class="sr-only">4.6 star rating</span> </span>  <a class="text-m" aria-label="4.6 star rating">1476 Reviews</a>   <div class="yotpo-clr"></div> </div> <div class="yotpo-clr"></div> </div>   <div class="yotpo-clr"></div> </div></div>\n      \n          <span class="product-offer-text" title="The perfect Stocking Filler!">The perfect Stocking Filler!</span>\n      \n      <div class="product-price-container">\n          <div class="product-price">\n              <span class="money">£' +
    data.variants[0].price / 100 +
    '</span>\n              <span class="original-price money"></span>\n          </div><!-- product-price -->\n  \n              <span class="price-per-ml"></span>\n      </div><!-- product-price-container -->\n      \n      \n      \n      <form method="post" action="/cart/add" id="product_form_5246620663853" accept-charset="UTF-8" class="shopify-product-form" enctype="multipart/form-data"><input type="hidden" name="form_type" value="product" tabindex="0"><input type="hidden" name="utf8" value="✓" tabindex="0">\n          \n          \n          \n          \n          <input type="hidden" name="id" class="variant-id" value="35062152200237" tabindex="0">\n\n          \n          \n              <div class="product-actions single-variant" data-available="true">\n\n                  \n                  \n\n                  <div class="product-swatch-dropdown no-variant-images" data-variant-count="1">\n                      <div class="current-swatch" data-available="true" data-quantity="2503" data-product-id="5246620663853">\n                          <span class="swatch-image"></span>\n                          <span class="swatch-title">150ml</span>\n                          <span class="swatch-status"></span>\n                          <svg aria-hidden="true" focusable="false" role="presentation" class="icon icon--wide icon-chevron-down" viewBox="0 0 10 6"><path d="M5 6L0 1.203 1.254 0 5 3.602 8.746 0 10 1.203 5 6z"></path></svg>\n                      </div><!-- current-swatch -->\n                      \n                  </div><!-- product-swatch-dropdown -->\n\n                  <div class="product-quantity-container">\n                      \n                      <div class="product-quantity-container-stock hide">\n                          \n                              <span>Out of Stock</span>\n                          \n                      </div>\n                      \n                      <div class="product-quantity-desktop ">\n                          \n                          <span class="btn-plain btn-quantity-decrease"><svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-minus" viewBox="0 0 20 20"><path fill="#444" d="M17.543 11.029H2.1A1.032 1.032 0 0 1 1.071 10c0-.566.463-1.029 1.029-1.029h15.443c.566 0 1.029.463 1.029 1.029 0 .566-.463 1.029-1.029 1.029z"></path></svg></span>\n                          <input type="number" class="product-quantity" name="quantity" value="1" min="1" max="2503" tabindex="0">\n                          <span class="btn-plain btn-quantity-increase"><svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-plus" viewBox="0 0 20 20"><path fill="#444" d="M17.409 8.929h-6.695V2.258c0-.566-.506-1.029-1.071-1.029s-1.071.463-1.071 1.029v6.671H1.967C1.401 8.929.938 9.435.938 10s.463 1.071 1.029 1.071h6.605V17.7c0 .566.506 1.029 1.071 1.029s1.071-.463 1.071-1.029v-6.629h6.695c.566 0 1.029-.506 1.029-1.071s-.463-1.071-1.029-1.071z"></path></svg></span>\n                      </div>\n                      <div class="product-quantity-mobile ">\n                          <div class="current-quantity" data-product-id="5246620663853">\n                              <span class="quantity-value">1</span>\n                              <svg aria-hidden="true" focusable="false" role="presentation" class="icon icon--wide icon-chevron-down" viewBox="0 0 10 6"><path d="M5 6L0 1.203 1.254 0 5 3.602 8.746 0 10 1.203 5 6z"></path></svg>\n                          </div><!-- current-quantity -->\n                          <div class="quantity-mobile-modal" data-product-id="5246620663853">\n                              <span class="modal-label">\n                                  <svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-close" viewBox="0 0 12 12"><path d="M12 .978L11.022 0 6 5.029.978-.001 0 .98l5.029 5.02L0 11.023.978 12 6 6.97 11.022 12l.978-.978L6.971 6 12 .978z" fill="#000"></path></svg>\n                                  <span class="label">Choose quantity</span>\n                              </span>\n                              <ul class="quantity-listing">\n                                  \n                                  \n                                      <li class="quantity-item selected">\n                                          <span class="custom-ratio"></span>\n                                          <span class="quantity-value">1</span>\n                                      </li>\n                                  \n                                      <li class="quantity-item">\n                                          <span class="custom-ratio"></span>\n                                          <span class="quantity-value">2</span>\n                                      </li>\n                                  \n                                      <li class="quantity-item">\n                                          <span class="custom-ratio"></span>\n                                          <span class="quantity-value">3</span>\n                                      </li>\n                                  \n                                      <li class="quantity-item">\n                                          <span class="custom-ratio"></span>\n                                          <span class="quantity-value">4</span>\n                                      </li>\n                                  \n                                      <li class="quantity-item">\n                                          <span class="custom-ratio"></span>\n                                          <span class="quantity-value">5</span>\n                                      </li>\n                                  \n                                      <li class="quantity-item">\n                                          <span class="custom-ratio"></span>\n                                          <span class="quantity-value">6</span>\n                                      </li>\n                                  \n                                      <li class="quantity-item">\n                                          <span class="custom-ratio"></span>\n                                          <span class="quantity-value">7</span>\n                                      </li>\n                                  \n                                      <li class="quantity-item">\n                                          <span class="custom-ratio"></span>\n                                          <span class="quantity-value">8</span>\n                                      </li>\n                                  \n                                      <li class="quantity-item">\n                                          <span class="custom-ratio"></span>\n                                          <span class="quantity-value">9</span>\n                                      </li>\n                                  \n                                      <li class="quantity-item">\n                                          <span class="custom-ratio"></span>\n                                          <span class="quantity-value">10</span>\n                                      </li>\n                                  \n                                      <li>\n                                          <div class="mobile-quantity-action">\n                                              <input type="number" class="mobile-quantity-input" placeholder="Type quantity" pattern="[0-9]*" min="1" max="2503" tabindex="0">\n                                              <span class="btn btn-primary">Done</span>\n                                          </div>\n                                      </li>\n                              </ul><!-- quantity-listing-->\n                          </div><!-- quantity-mobile-modal -->\n                      </div><!-- product-quantity-mobile -->\n\n                  </div><!-- product-quantity-container -->\n\n                  <button type="submit" class="btn-basket btn btn-primary " data-add-to-cart-text="Add to basket" data-sold-out-text="Out of stock" data-preorder-text="The selected option is out of stock. Share your email and we will notify you when it appears." data-feedback-output=".product-page-feedback" tabindex="0">Add to basket</button>\n\n                  <a class="hide notify-link btn btn-primary klevuProductClick" href="/products/skin-so-soft-original-dry-oil-spray?variant=35062152200237" data-link="/products/skin-so-soft-original-dry-oil-spray" tabindex="0">Get notified</a>\n\n                  \n\n              </div><!-- product-actions -->\n          \n      </form>\n\n  </div><!-- product-details -->\n</div>\n  ';
  return productCard;
}
function parseBadges(product) {
  var imageContainer = product.getElementsByClassName('dy-recommendation-product__image-container')[0];
  var badgeLeft = product.getElementsByClassName('badge--left')[0];
  var badgeRight = product.getElementsByClassName('badge--right')[0];
  var badgesData = imageContainer.getAttribute('data-badge-data');
  var badgeNew = product.getAttribute('data-dy-new');
  var badgeOffer = product.getAttribute('data-dy-special-offer');
  var salePrice = product.getAttribute('data-dy-sale-price');
  var discountPercentage = parseFloat(product.getAttribute('data-dy-discount-percentage'));

  if (badgesData.toLowerCase().indexOf('bestseller') !== -1) {
    imageContainer.setAttribute('data-badge', 'bestseller');
    badgeLeft.textContent = 'BESTSELLER';
    badgeRight.textContent = discountPercentage.toFixed(0) + '% off';
    if (discountPercentage <= 0) {
      badgeRight.style.setProperty('display', 'none');
    }
  } else if (badgeNew.toLowerCase().indexOf('true') !== -1) {
    imageContainer.setAttribute('data-badge', 'new');
    badgeLeft.textContent = 'NEW!';
    badgeRight.textContent = discountPercentage.toFixed(0) + '% off';
    if (discountPercentage <= 0) {
      badgeRight.style.setProperty('display', 'none');
    }
  } else if (badgeOffer.toLowerCase().indexOf('true') !== -1) {
    imageContainer.setAttribute('data-badge', 'offer');
    badgeLeft.textContent = 'OFFER';
    badgeRight.textContent = discountPercentage.toFixed(0) + '% off';
    if (discountPercentage <= 0) {
      badgeRight.style.setProperty('display', 'none');
    }
  } else if (salePrice !== '') {
    imageContainer.setAttribute('data-badge', 'sale');
    badgeLeft.textContent = 'SALE!';
    badgeRight.textContent = discountPercentage.toFixed(0) + '% off';
    if (discountPercentage <= 0) {
      badgeRight.style.setProperty('display', 'none');
    }
  }
}

function toggleShadeOrSize(product, isShadeProduct) {
  var variantContainer = product.getElementsByClassName('variant-container')[0];
  var item = document.createElement('div');

  if (isShadeProduct) {
    item.innerHTML = shadeClickButtonTemplate();
  } else {
    item.innerHTML = sizeClickButtonTemplate();
    variantContainer.classList.add('variant-type--size');
  }

  variantContainer.appendChild(item);
  unwrap(item);
}

function unwrap(wrapper) {
  // place childNodes in document fragment
  var docFrag = document.createDocumentFragment();
  while (wrapper.firstChild) {
    var child = wrapper.removeChild(wrapper.firstChild);
    docFrag.appendChild(child);
  }

  // replace wrapper with document fragment
  wrapper.parentNode.replaceChild(docFrag, wrapper);
}

function shadeClickButtonTemplate() {
  /* eslint-disable */
  return multiString(function () {
    ' <div class="variant-shade-outline">\
      <div class="variant-shade-inline">\
        <div class="variant-inside-color"></div>\
      </div>\
    </div>\
    <svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">\
      <path d="M11.9218 0.292855C12.2772 0.653319 12.3045 1.22055 12.0039 1.61286L11.9219 1.70707L6.99422 6.70707C6.63893 7.06757 6.07984 7.09533 5.69317 6.79033L5.60031 6.70715L0.67154 1.70715C0.2866 1.31664 0.286566 0.683478 0.671464 0.292932C1.02675 -0.0675718 1.58584 -0.0953323 1.97252 0.209671L2.06538 0.292855L6.29767 4.585L10.5279 0.292932C10.8832 -0.0675718 11.4423 -0.0953323 11.829 0.209671L11.9218 0.292855Z" fill="#181818"/>\
    </svg>';
  });
  /* eslint-enable */
}

function sizeClickButtonTemplate() {
  /* eslint-disable */
  return multiString(function () {
    /**
    <div class="variant-size-block">SIZE</div>
    <svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.9218 0.292855C12.2772 0.653319 12.3045 1.22055 12.0039 1.61286L11.9219 1.70707L6.99422 6.70707C6.63893 7.06757 6.07984 7.09533 5.69317 6.79033L5.60031 6.70715L0.67154 1.70715C0.2866 1.31664 0.286566 0.683478 0.671464 0.292932C1.02675 -0.0675718 1.58584 -0.0953323 1.97252 0.209671L2.06538 0.292855L6.29767 4.585L10.5279 0.292932C10.8832 -0.0675718 11.4423 -0.0953323 11.829 0.209671L11.9218 0.292855Z" fill="#181818"/>
    </svg>
  **/
  });
  /* eslint-enable */
}

function setUnitPrice(product) {
  var unitElement = product.getElementsByClassName('dy-recommendation-product__detail--description')[0];
  var unitPrice = unitElement.getAttribute('data-unit-price');

  if (unitPrice.length > 5) {
    unitElement.setAttribute('data-visible', 'true');
  }
}

function shadeDropdownTemplate(shadehex, name, cartsku, sku) {
  /* eslint-disable */
  return multiString(function () {
    /**
  <div class="variant-shade__item" data-dy-cart-sku="#cartsku" data-dy-variant-name="#variantname" data-dy-shade-hex="#shadehex" data-dy-variant-sku="#variantsku">
    <div class="variant-shade-outline">
      <div class="variant-shade-inline">
        <div class="variant-inside-color" style="background: #shadehex2;"></div>
      </div>
    </div>
    <span class="variant-shade-item__name">#name</span>
  </div>
  **/
  })
    .replace('#shadehex2', shadehex)
    .replace('#shadehex', shadehex)
    .replace('#name', name)
    .replace('#variantname', name)
    .replace('#variantsku', sku)
    .replace('#cartsku', cartsku);
  /* eslint-enable */
}

function notShadesDropdownTemplate(name, cartsku, sku) {
  return multiString(function () {
    /**
  <div class="variant-shade__item" data-dy-cart-sku="#cartsku" data-dy-variant-name="#variantname" data-dy-variant-sku="#variantsku">
    <span class="variant-shade-item__name">#name</span>
  </div>
  **/
  })
    .replace('#name', name)
    .replace('#variantname', name)
    .replace('#variantsku', sku)
    .replace('#cartsku', cartsku);
}

function multiString(f) {
  return f.toString().split('\n').slice(1, -1).join('\n');
}

function setVariantEvents(product) {
  var variantNode = product.getElementsByClassName('product-detail__variant')[0];
  var variantItemWrapper = product.getElementsByClassName('variant-dropdown-shades-container')[0];
  var variantItemContainer = product.getElementsByClassName('product-variant-dropdown')[0];
  var masterProduct = variantNode.getAttribute('data-dy-masterproduct');
  var singleVariant = variantNode.getAttribute('data-dy-singlevariant');
  var variantType = variantNode.getAttribute('data-dy-varianttype');
  var isShadeProduct = variantType.toLowerCase() === 'shade' ? true : false;

  if (masterProduct.toLowerCase() === 'true' && singleVariant.toLowerCase() === 'false') {
    toggleShadeOrSize(product, isShadeProduct);
    listenVariantClose(product, variantItemContainer);

    if (isShadeProduct) {
      setFirstVariantColor(variantNode);
    }

    var variantCta = variantNode.getElementsByClassName('variant-container')[0];

    variantCta.addEventListener('click', function () {
      getVariantsData(product, variantNode).then(function (data) {
        if (variantItemWrapper.childElementCount === 0) {
          data.forEach(function (productData, index) {
            var newItem = document.createElement('div');

            if (isShadeProduct) {
              newItem.innerHTML = shadeDropdownTemplate(
                productData.varianthexcode,
                productData.variantname,
                productData.cartsku,
                productData.sku
              );
            } else {
              newItem.innerHTML = notShadesDropdownTemplate(productData.variantname, productData.cartsku, productData.sku);
            }

            if (index === 0) {
              newItem.firstElementChild.classList.add('dy-item--active');
            }

            variantItemWrapper.appendChild(newItem.firstElementChild);
          });

          addSelectionEvents(product, isShadeProduct);
        }

        variantItemContainer.classList.add('dy--visible');
        fixProductHeight();
      });
    });
  }
}

function addSelectionEvents(product, isShadeProduct) {
  var selectableItems = product.getElementsByClassName('variant-shade__item');

  [].slice.call(selectableItems).forEach(function (item) {
    item.addEventListener('click', function () {
      var dataCartSku = item.getAttribute('data-dy-cart-sku');
      var dataVariantName = item.getAttribute('data-dy-variant-name');
      var dataVariantSku = item.getAttribute('data-dy-variant-sku');
      product.setAttribute('data-dy-cart-sku', dataCartSku);
      product.setAttribute('data-dy-variant-name', dataVariantName);
      product.setAttribute('data-dy-variant-sku', dataVariantSku);

      if (isShadeProduct) {
        var selectionButtonShadeColorNode = product.querySelector('.product-detail__variant .variant-inside-color');
        var newShadeColor = item.getAttribute('data-dy-shade-hex');

        selectionButtonShadeColorNode.style.setProperty('background', newShadeColor);
      }

      [].slice.call(item.parentElement.getElementsByClassName('variant-shade__item')).forEach(function (listItems) {
        listItems.classList.remove('dy-item--active');
      });

      item.classList.add('dy-item--active');

      variantItemContainer = item.parentElement.parentElement;
      variantItemContainer.classList.remove('dy--visible');
      var leftActiveItems = product.querySelectorAll('.product-variant-dropdown.dy--visible');
      if (leftActiveItems.length === 0) {
        sliderElement.style.removeProperty('padding-bottom');
        sliderElement.style.removeProperty('margin-bottom');
      }
    });
  });
}

function listenVariantClose(product, variantItemContainer) {
  var openNode = product.getElementsByClassName('product-detail__variant')[0];
  document.addEventListener('mousedown', function (e) {
    if (
      variantItemContainer.classList.contains('dy--visible') &&
      !e.path.includes(variantItemContainer) &&
      !e.path.includes(openNode)
    ) {
      variantItemContainer.classList.remove('dy--visible');
      var leftActiveItems = product.querySelectorAll('.product-variant-dropdown.dy--visible');
      if (leftActiveItems.length === 0) {
        sliderElement.style.removeProperty('padding-bottom');
        sliderElement.style.removeProperty('margin-bottom');
      }
    }
  });
}

function fixProductHeight() {
  sliderElement.style.setProperty('padding-bottom', '200px');
  sliderElement.style.setProperty('margin-bottom', '-200px');
}

function getVariantsData(product, variantNode) {
  return DYO.Q.Promise(function (resolve, reject) {
    var sku = product.getAttribute('data-dy-sku');
    var variantList = variantNode.getAttribute('data-dy-variantlist');
    var skus = variantList.split('|');

    if (apiVariantCache.hasOwnProperty(sku)) {
      resolve(apiVariantCache[sku]);
      return;
    }

    DY.ServerUtil.getProductsData(skus, [], '', true, function (err, res) {
      if (err) {
        reject();
      } else {
        var result = Object.keys(res).map(function (key) {
          return {
            sku: res[key].productData.sku,
            cartsku: res[key].productData.cartsku,
            variantname: res[key].productData.variantname,
            varianthexcode: res[key].productData.varianthexcode,
          };
        });

        apiVariantCache[sku] = result;
        resolve(result);
        return;
      }
    });
  });
}

function setFirstVariantColor(variantNode) {
  var variantHexColor = variantNode.getAttribute('data-dy-varianthexcode');
  var variantColorNode = variantNode.getElementsByClassName('variant-inside-color')[0];
  variantColorNode.style.setProperty('background-color', variantHexColor);
}

function setQuantityEvents(product) {
  var minusNode = product.getElementsByClassName('quantity__minus')[0];
  var inputNode = product.getElementsByClassName('quantity__input')[0];
  var plusNode = product.getElementsByClassName('quantity__plus')[0];

  minusNode.addEventListener('click', function () {
    if (!minusNode.classList.contains('dy--disabled')) {
      if (parseInt(inputNode.value) > 1) {
        inputNode.value = parseInt(inputNode.value) - 1;
      }
      if (parseInt(inputNode.value) <= 1) {
        minusNode.classList.add('dy--disabled');
      }
    }
  });

  plusNode.addEventListener('click', function () {
    if (!plusNode.classList.contains('dy--disabled')) {
      inputNode.value = parseInt(inputNode.value) + 1;

      if (parseInt(inputNode.value) > 1) {
        minusNode.classList.remove('dy--disabled');
      }
    }
  });
}

function setA2cEvent(product) {
  var a2cButtonNode = product.querySelector('.detail__cta:not(.cta--disabled)');
  var a2cDisabledButtonNode = product.querySelector('.detail__cta.cta--disabled');

  a2cDisabledButtonNode.addEventListener('click', function (e) {
    e.preventDefault();
  });

  a2cButtonNode.addEventListener('click', function (e) {
    e.preventDefault();

    var currentSKU = product.getAttribute('data-dy-cart-sku');
    var quantity = parseInt(product.getElementsByClassName('quantity__input')[0].value || '0');
    var campaign = typeof _ShopContext !== 'undefined' && _ShopContext.CampaignNumber ? _ShopContext.CampaignNumber : 0;
    var shopifyId = product.getAttribute('data-dy-url').split('variant=')[1];
    var cartData = {
      id: shopifyId,
      quantity: quantity,
      Campaign: campaign,
    };

    var sucessfullNode = product.getElementsByClassName('dy-recommendation-product__a2c-success')[0];
    sucessfullNode.classList.add('dy--visible');

    //$('html').scope().CartService.AddToCart(cartData, '', 11.0); // eslint-disable-line
    console.log(cartData);
    // addDelItem(cartData);
    fetch(`/cart/add.js`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartData),
    }).then((res) => {
      console.log(res);
      triggerEvent('Add to Bag From Recommendations', {});
      dataLayerPush(product);
      sucessfullNode.classList.remove('dy--visible');
    });

    // setTimeout(function () {

    // }, 3000);
  });
}

function findRow(node) {
  var i = 1;
  /* eslint-disable */
  while ((node = node.previousSibling)) {
    if (node.nodeType === 1) {
      ++i;
    }
  }
  /* eslint-enable */
  return i;
}

function dataLayerPush(product) {
  var groupId = product.getAttribute('data-dy-group-id');
  var productName = product.getAttribute('data-dy-name');
  var list = product.getAttribute('data-dy-url').split('/product')[1];
  var position = findRow(product);
  var category = product.getAttribute('data-dy-keywords').split(',')[0];
  var brand = product.getAttribute('data-dy-keywords').split(',')[1];
  var variantName = product.getAttribute('data-dy-variant-name');
  var price = product.getAttribute('data-dy-price');
  var quantity = parseInt(product.getElementsByClassName('quantity__input')[0].value);
  var subcategory = product.getAttribute('data-categories').split(',')[1] || '';
  var subSubcategory = product.getAttribute('data-categories').split(',')[2] || '';
  var isAvailable = product.getAttribute('data-dy-stock') === 'true' ? 'yes' : 'no';
  var isNew = product.getAttribute('data-dy-new') === 'true' ? 'yes' : 'no';
  var isOnSale = product.getAttribute('data-dy-sale');
  var discountValue = product.getAttribute('data-dy-discount-value');
  var listPrice = product.getAttribute('data-dy-list-price');
  var variantSku = product.getAttribute('data-dy-variant-sku');
  var dimension50 = '';
  var dimension51 = '';

  dataLayer.forEach(function (object) {
    if (object.hasOwnProperty('dimension55')) {
      dimension50 = object.dimension55;
    }

    if (object.hasOwnProperty('dimension52')) {
      dimension51 = object.dimension52;
    }
  });

  dataLayer.push({
    event: 'addToCart', // fix
    ecommerce: {
      add: {
        products: [
          {
            id: groupId, // group_id
            name: productName,
            list: list, // url of the site without the domain
            position: position, // product’s place on the list (carousel)
            category: category, // first word in the keywords
            brand: brand, // second word in the keywords
            variant: variantName, // variantname
            price: price,
            quantity: quantity,
            dimension14: subcategory, // subcategory
            dimension15: subSubcategory, // sub-subcategory
            dimension20: isAvailable, // Is-avaiable
            dimension21: isNew, // Is-new based on new column
            dimension22: isOnSale, // On-sale; based on saleprice
            dimension35: discountValue, // Discount; value based on discountvalue
            dimension36: listPrice, // Previous price; listprice
            dimension49: variantSku, // Common Product ID; sku of the variant
            dimension50: dimension50, // Market same as dataLayer D55
            dimension51: dimension51, // Market Cluster same as dataLayer D52
            dimension59: 'DY', // Add to Cart Section fix text
          },
        ],
      },
    },
  });
}

function generatePrices(product) {
  var productContainer = product.getElementsByClassName('dy-recommendation-product__detail--price')[0];
  var price = parseFloat(productContainer.getAttribute('data-price') || '0');
  var oldPrice = parseFloat(productContainer.getAttribute('data-old-price') || '0');

  if (price === oldPrice || oldPrice < price) {
    var oldPriceNode = productContainer.getElementsByClassName('rec_old_price_num')[0];
    oldPriceNode.style.setProperty('display', 'none');
    product.setAttribute('data-dy-sale', 'no');
  }
}

function generateStarRatings(product) {
  var starsContainer = product.getElementsByClassName('dy-recommendation-product__detail--rating')[0];
  var starsCount = parseFloat(starsContainer.getAttribute('data-stars-rating') || '0');

  if (starsCount > 0) {
    var starsHolder = starsContainer.getElementsByClassName('product-rating__stars-full')[0];
    var starsWidth = (starsCount / 5) * 100;
    starsHolder.style.setProperty('width', starsWidth + '%');
  }
}

function addCurrencyToPrices() {
  [].slice.call(container.querySelectorAll('.dy-recommendation-product__detail--price span')).forEach(function (el) {
    el.textContent = formatPrice(el.textContent, CURRENCY_SIGN, CURRENCY_POSITION);
  });
}

function parsePriceHtml(num, integrSeperator, fructionSeperator) {
  var str = parseFloat(num).toFixed(2).toString().split('.');
  if (str[0].length >= 5) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1' + integrSeperator);
  }
  if (str[1] && str[1].length >= 5) {
    str[1] = str[1].replace(/(\d{3})/g, '$1 ');
  }
  return str.join(fructionSeperator);
}

function formatPrice(price, sign, position) {
  var parsedPrice = parsePriceHtml(price, '${Thousands Separator}', '${Decimal Separator}');
  var data = position === POSITION_PREFIX ? [sign, parsedPrice] : [parsedPrice, sign];
  return data.join('');
}

function setResponsiveAttributes() {
  var ENABLE_ARROWS_DESKTOP = !!parseInt('${Visibility on Desktop}');
  var ENABLE_ARROWS_TABLET = !!parseInt('${Visibility on Tablet}');
  var ENABLE_ARROWS_MOBILE = !!parseInt('${Visibility on Mobile}');

  var ENABLE_PAGINATION_DESKTOP = !!parseInt('${Dots on Desktop}');
  var ENABLE_PAGINATION_TABLET = !!parseInt('${Dots on Tablet}');
  var ENABLE_PAGINATION_MOBILE = !!parseInt('${Dots on Mobile}');

  var settings = [
    {
      el: '.dy-recommendations-slider-pagination',
      data: {
        'dy-hide--d': !ENABLE_PAGINATION_DESKTOP,
        'dy-hide--t': !ENABLE_PAGINATION_TABLET,
        'dy-hide--m': !ENABLE_PAGINATION_MOBILE,
      },
    },
    {
      el: '.dy-recommendations-slider-arrows',
      data: {
        'dy-hide--d': !ENABLE_ARROWS_DESKTOP,
        'dy-hide--t': !ENABLE_ARROWS_TABLET,
        'dy-hide--m': !ENABLE_ARROWS_MOBILE,
      },
    },
  ];

  settings.forEach(function (item) {
    var el = container.querySelector(item.el);
    for (var key in item.data) {
      if (item.data[key]) {
        el.classList.add(key);
      }
    }
  });
}

function getSliderOptions() {
  var ENABLE_AUTOPLAY = !!parseInt('${Autoplay}');
  var AUTOPLAY_SPEED = parseInt('${Autoplay Speed}') * 1000;
  var SCROLL_MULTIPLE_ITEMS = '${Scroll Behavior}' === 'page';

  var ITEMS_TO_DISPLAY_XL = parseInt('${Large Screen}');
  var ITEMS_TO_DISPLAY_DESKTOP = parseInt('${Standard Screen}');
  var ITEMS_TO_DISPLAY_TABLET = parseInt('${Tablet}');
  var ITEMS_TO_DISPLAY_MOBILE = parseInt('${Mobile}');

  var ENABLE_LOOP = 0;
  if (
    (SCREEN_WIDTH <= '480' && INJECTED_PRODUCTS > ITEMS_TO_DISPLAY_MOBILE) ||
    (SCREEN_WIDTH > '480' && SCREEN_WIDTH <= '699' && INJECTED_PRODUCTS > ITEMS_TO_DISPLAY_TABLET) ||
    (SCREEN_WIDTH > '699' && SCREEN_WIDTH <= '930' && INJECTED_PRODUCTS > ITEMS_TO_DISPLAY_DESKTOP) ||
    (SCREEN_WIDTH > '930' && INJECTED_PRODUCTS > ITEMS_TO_DISPLAY_XL)
  ) {
    ENABLE_LOOP = !!parseInt('${Infinite Scroll}');
  }

  return {
    touchStartPreventDefault: false,
    loop: ENABLE_LOOP,
    preloadImages: false,
    lazy: true,
    loopAdditionalSlides: 0,
    autoplay: ENABLE_AUTOPLAY && {
      delay: AUTOPLAY_SPEED,
    },
    spaceBetween: 18,
    slidesPerView: ITEMS_TO_DISPLAY_XL,
    slidesPerGroup: SCROLL_MULTIPLE_ITEMS ? ITEMS_TO_DISPLAY_XL : 1,
    breakpoints: {
      480: {
        slidesPerView: ITEMS_TO_DISPLAY_MOBILE,
        slidesPerGroup: SCROLL_MULTIPLE_ITEMS ? ITEMS_TO_DISPLAY_MOBILE : 1,
      },
      699: {
        slidesPerView: ITEMS_TO_DISPLAY_TABLET,
        slidesPerGroup: SCROLL_MULTIPLE_ITEMS ? ITEMS_TO_DISPLAY_TABLET : 1,
      },
      930: {
        slidesPerView: ITEMS_TO_DISPLAY_DESKTOP,
        slidesPerGroup: SCROLL_MULTIPLE_ITEMS ? ITEMS_TO_DISPLAY_DESKTOP : 1,
      },
    },
    navigation: {
      nextEl: container.querySelector('.dy-recommendations-slider-button--next'),
      prevEl: container.querySelector('.dy-recommendations-slider-button--prev'),
      disabledClass: 'dy-recommendations-slider-button--disabled',
    },
    pagination: {
      el: container.querySelector('.dy-recommendations-slider-pagination'),
      bulletClass: 'dy-recommendations-slider-pagination-bullet',
      bulletActiveClass: 'dy-recommendations-slider-pagination-bullet__active',
      modifierClass: 'dy-recommendations-slider-pagination-',
      clickableClass: 'dy-recommendations-slider-pagination--clickable',
      clickable: true,
      type: 'bullets',
      renderBullet: function (_index, className) {
        return '<div class="' + className + '"></div>';
      },
    },
    a11y: {
      notificationClass: 'dy-recommendations-slider--aria-notification',
    },
    slideClass: 'dy-recommendation-product',
    wrapperClass: 'dy-recommendations__slider-wrapper',
    containerModifierClass: 'dy-recommendations__slider-',
  };
}

function appendJSFile(url) {
  return DYO.Q.Promise(function (resolve, reject) {
    if (typeof define === 'function' && define.amd) {
      require([url], function (swiper) {
        window.Swiper = swiper;
        resolve();
      });
      return;
    }

    var js = document.createElement('SCRIPT');
    js.setAttribute('type', 'text/javascript');
    js.setAttribute('src', url);

    js.addEventListener('load', resolve);
    js.addEventListener('error', reject);

    document.head.appendChild(js);
  });
}

function addWindowResizeEvent() {
  var debouncedCenterSwiperButtonOnProduct = debounce(centerSwiperButtonOnProduct, 200);
  window.addEventListener('resize', debouncedCenterSwiperButtonOnProduct);
}

function centerSwiperButtonOnProduct() {
  var product = container.getElementsByClassName('dy-recommendation-product')[0];
  var productHeight = product.clientHeight;
  var swiperButtons = [].slice.call(container.getElementsByClassName('dy-recommendations-slider-button'));
  swiperButtons.forEach(function (button) {
    button.style.top = productHeight / 2 - button.clientHeight / 2 + 'px';
  });
}

function swiperArrowEvents() {
  var swiperButtons = [].slice.call(container.getElementsByClassName('dy-recommendations-slider-button'));
  swiperButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      triggerEvent('Click On Arrow Recommendations', {});
    });
  });
}

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function triggerEvent(eventName, eventProperties, isDelayed) {
  var eventData = {
    name: eventName,
    properties: eventProperties,
  };
  if (isDelayed && DY.Detectors && DY.Detectors.ua && DY.Detectors.ua().safari) {
    DY.ServerUtil.delayedLogEvent(eventData);
  } else {
    DY.API('event', eventData);
  }
}
