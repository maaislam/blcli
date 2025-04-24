import { angularCompile, getLayoutName } from './../../../../../lib/utils/avon';
import shared from './shared';
import { events, pollerLite } from './../../../../../lib/utils';
import { getLanguage, getMarket } from '../../../../../lib/utils/avon';
import { translate as _t } from './services';
import deliveryMethods from './deliveryMethods';


export default () => {
  const { ID } = shared;

/**
 * Entry point for running build
 */
  const cartScope = $('#CartPage').scope();
  let freeDeliveryThreshold = 20;

  const market = getMarket();
  if(market == 'za') {
    // South Africa
    freeDeliveryThreshold = 600;
  } else if(market == 'ru') {
    // Russia
    freeDeliveryThreshold = 1500;
  } else if(market == 'it') {
    // Italy
    freeDeliveryThreshold = 19;
  }



  /**
   * Helper get HTML
   */
  const getHtml = (deliveryMessaging) => {
    return `
      <div class="${ID}-tit">
        <a class="${ID}-tit__cont" ng-click="CloseClick()">&lt; ${_t('Continue Shopping')}</a>
        <h2 class="${ID}-tit__title">${_t('Shopping Bag')}</h2>
        <a class="${ID}-tit__cross" ng-click="CloseClick()">&times;</a>
      </div>

      <div class="${ID}-summary">
        <div class="${ID}-summary__left">
          <span>${_t('Items')}:</span>
          <strong class="${ID}-summary__num-items" ng-bind="(CartData.NumberOfItemsInCart)"></strong>
        </div>
        <div class="${ID}-summary__right">
          <span>${_t('Total Item Price')}: </span>
          <strong class="${ID}-summary__subtotal" ng-bind="(CartData.SubTotal | currency)"></strong>
        </div>
      </div>

      <div class="${ID}-items">
        <div class="Cart-Campaigns" ng-repeat="campaign in CartData.Campaigns">

          <!-- DESKTOP LAYOUT -->
          <div ng-if="Layout.Name == 'Desktop'" class="Cart-Product" ng-repeat="product in campaign.Products">

            <div class="${ID}-title-wrap">
              <a ng-show="product.CanModify && product.LoneVariant !== null" class="Cart-ProductRemove" 
                ng-click='RemoveProduct(product.LoneVariant.Sku, campaign.Campaign)' data_nav="cart" 
                data_productsku="{{::product.LoneVariant.Sku}}" 
                data_action="removefromCart"><span>&times;</span></a>

              <div class="Cart-ProductName" ng-bind="(product.LoneVariant.VariantLineNo ? product.LoneVariant.VariantLineNo + ' - ' : '') + product.Name"></div>
            </div>

            <div class="${ID}-colwrap">
              <div class="${ID}-col1">
                <img alt="{{::product.Name}}" title="{{::product.Name}}" ng-src="{{::Cdn.ProductImageLarge(product.ProfileNumber, 1)}}" class="Cart-list-product-image" fallback-src="/styles/core/images/productfallback.svg" />
              </div>

              <div class="${ID}-col2">
                <div class="${ID}-drow">
                  <div ng-if="product.LoneVariant !== null" class="Cart-VariantItem">

                    <div class="${ID}-drow__swatch"></div>

                    <div class="${ID}-drow__price Cart-ProductPrice">
                      <div class="Cart-ProductPriceWrapper">
                          <div ng-show="product.RegularPrice != product.Price" class="Cart-ProductPriceOld">
                              <span class="Cart-OldPrice" ng-bind="::(product.RegularPrice | currency)"></span>
                          </div>
                          <span class="Cart-ProductPriceCurrent" ng-bind="::(product.Price | currency)"></span>

                      </div>
                    </div>

                    <div class="${ID}-drow__legal">
                      <legal-info show-vat-info="false"
                                  show-unit-price-info="false"
                                  show-shipping-info="false"
                                  unit="product.PricePerUnitInformation"
                                  price="product.UnitPrice"
                                  measure-unit="product.UnitPriceMeasureUnit"
                                  layout="'Type1 Basket'"></legal-info>
                    </div>
              
                    <div class="${ID}-drow__quantity ${ID}-lone-quantity" 
                        ng-show="product.CanModify && product.LoneVariant !== null && CanChangeQuantity">
                      <productquantity quantity="product.Quantity" 
                        sku="product.LoneVariant.Sku" 
                        quantitychanged="product.QuantityChanged"></productquantity>


                      <div class="${ID}-qty-update">
                        <a ng-click="UpdateCart(1)"><span>${_t('Update')}</span></a>
                      </div>
                    </div>
                    
                  </div>
                </div>

                <div ng-if="product.Variants !== null">
                  <div class="Cart-Variants" ng-repeat="variant in product.Variants">
                    <div class="Cart-VariantItem" ng-show="variant.VariantType !== VariantType.None && variant.VariantName !== null && variant.VariantFsc !== null">
                      <div class="${ID}-drow__swatch">
                        <a class="Cart-ProductRemove" ng-click='RemoveProduct(variant.Sku, campaign.Campaign)' data_nav="cart" data_productsku="{{::variant.Sku}}" data_action="removefromCart"><span>&times;</span></a>

                        <!--
                        <div class="Cart-Shade">
                            <span ng-if="::product.Variants[0].VariantType == 0">
                                <span>Chosen Fragrances</span>
                            </span>
                            <span ng-if="::product.Variants[0].VariantType == 1">
                                <span>Chosen Shades</span>
                            </span>
                            <span ng-if="::product.Variants[0].VariantType == 2">
                                <span>Chosen Sizes</span>
                            </span>
                            <span ng-if="::product.Variants[0].VariantType > 2">
                                <span>Chosen Options</span>
                            </span>
                        </div>
                        -->
                        <div class="Cart-VariantImage">
                            <img alt="{{::variant.VariantName}}" title="{{::variant.VariantName}}" ng-src="{{::variant.VariantImage}}" ng-show="::variant.VariantImage" />
                        </div>

                        <div class="Cart-VariantName" ng-bind="::(variant.VariantName)"></div>
                      </div>

                      <div class="${ID}-drow__price Cart-ProductPrice">
                        <div class="Cart-ProductPriceWrapper">
                            <div ng-show="product.RegularPrice != product.Price" class="Cart-ProductPriceOld">
                                <span class="Cart-OldPrice" ng-bind="::(product.RegularPrice | currency)"></span>
                            </div>
                            <span class="Cart-ProductPriceCurrent" ng-bind="::(product.Price | currency)"></span>

                        </div>
                      </div>

                      <div class="${ID}-drow__legal">
                        <legal-info show-vat-info="false"
                                    show-unit-price-info="false"
                                    show-shipping-info="false"
                                    unit="product.PricePerUnitInformation"
                                    price="product.UnitPrice"
                                    measure-unit="product.UnitPriceMeasureUnit"
                                    layout="'Type1 Basket'"></legal-info>
                      </div>

                      <div class="${ID}-drow__quantity">
                        <div class="Cart-ProductActions" ng-show="product.CanModify && CanChangeQuantity">
                          <productquantity quantity="variant.Quantity" sku="variant.Sku" quantitychanged="variant.QuantityChanged"
                            ></productquantity>
                          <div class="${ID}-qty-update">
                            <a ng-click="UpdateCart(1)"><span>${_t('Update')}</span></a>
                          </div>
                        </div>
                        <div ng-show="!product.CanModify || !CanChangeQuantity" class="qty qty_spacing" ng-bind="variant.Quantity"></div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

						<div class="Cart-product-price-wrapper">
              <strong>${_t('Item sub-total')}:</strong>

							<span class="Cart-product-price-current">
								{{(product.ProductTotal | currency)}}
								<span ng-show="product.HasPromotion">**</span>
							</span>
						</div>
          </div>

          <!-- PHONE LAYOUT -->
          <div ng-if="Layout.Name == 'Phone'" class="Cart-Product" ng-repeat="product in campaign.Products">

            <div class="${ID}-img-and-title">

              <div class="Cart-ProductImage">
                <img alt="{{::product.Name}}" title="{{::product.Name}}" ng-src="{{::Cdn.ProductImageMedium(product.ProfileNumber, 1)}}" class="Cart-list-product-image" fallback-src="/styles/core/images/productfallback.svg" />
              </div>

              <div class="Cart-ProductName" ng-bind="(product.LoneVariant.VariantLineNo ? product.LoneVariant.VariantLineNo + ' - ' : '') + product.Name"></div>

              <div ng-show="product.CanModify && product.LoneVariant !== null">
                <a class="Cart-ProductRemove" 
                  ng-click='RemoveProduct(product.LoneVariant.Sku, campaign.Campaign)' data_nav="cart" 
                  data_productsku="{{::product.LoneVariant.Sku}}" 
                  data_action="removefromCart"><span>&times;</span></a>
              </div>

            </div>

            <div ng-class=" (product.LoneVariant !== null ? '${ID}-price-row' + ' lone-variant' : '${ID}-price-row')">

              <div class="Cart-ProductPrice">
								<div class="Cart-ProductPriceWrapper">
										<div ng-show="product.RegularPrice != product.Price" class="Cart-ProductPriceOld">
												<span class="Cart-OldPrice" ng-bind="::(product.RegularPrice | currency)"></span>
										</div>
										<span class="Cart-ProductPriceCurrent" ng-bind="::(product.Price | currency)"></span>

								</div>

							</div>
              

              <!-- Lone variant quantity selector -->
              <div class="${ID}-lone-quantity" ng-show="product.CanModify && product.LoneVariant !== null && CanChangeQuantity">
                <productquantity quantity="product.Quantity" 
                  sku="product.LoneVariant.Sku" 
                  quantitychanged="product.QuantityChanged"></productquantity>


                <div class="${ID}-qty-update">
                  <a ng-click="UpdateCart(1)"><span>${_t('Update')}</span></a>
                </div>
              </div>
            </div>

            <div class="Cart-Variants" ng-repeat="variant in product.Variants">
              <div class="Cart-VariantItem" ng-show="variant.VariantType !== VariantType.None && variant.VariantName !== null && variant.VariantFsc !== null">
								<a class="Cart-ProductRemove" ng-click='RemoveProduct(variant.Sku, campaign.Campaign)' data_nav="cart" data_productsku="{{::variant.Sku}}" data_action="removefromCart"><span>&times;</span></a>

                <!--
                <div class="Cart-Shade">
                    <span ng-if="::product.Variants[0].VariantType == 0">
                        <span>Chosen Fragrances</span>
                    </span>
                    <span ng-if="::product.Variants[0].VariantType == 1">
                        <span>Chosen Shades</span>
                    </span>
                    <span ng-if="::product.Variants[0].VariantType == 2">
                        <span>Chosen Sizes</span>
                    </span>
                    <span ng-if="::product.Variants[0].VariantType > 2">
                        <span>Chosen Options</span>
                    </span>
                </div>
                -->
                <div class="Cart-VariantImage">
                    <img alt="{{::variant.VariantName}}" title="{{::variant.VariantName}}" ng-src="{{::variant.VariantImage}}" ng-show="::variant.VariantImage" />
                </div>

                <div class="Cart-VariantName" ng-bind="::(variant.VariantName)"></div>

                <div class="Cart-ProductActions" ng-show="product.CanModify && CanChangeQuantity">
                  <productquantity quantity="variant.Quantity" sku="variant.Sku" quantitychanged="variant.QuantityChanged"
                    ></productquantity>
                  <div class="${ID}-qty-update">
                    <a ng-click="UpdateCart(1)"><span>${_t('Update')}</span></a>
                  </div>
                </div>
                <div ng-show="!product.CanModify || !CanChangeQuantity" class="qty qty_spacing" ng-bind="variant.Quantity"></div>
              </div>
            </div>

						<div class="Cart-product-price-wrapper">

							<legal-info show-vat-info="false"
													show-unit-price-info="false"
													show-shipping-info="false"
													unit="product.PricePerUnitInformation"
													price="product.UnitPrice"
													measure-unit="product.UnitPriceMeasureUnit"
													layout="'Type1 Basket'"></legal-info>

							<span class="Cart-product-price-current">
								{{(product.ProductTotal | currency)}}
								<span ng-show="product.HasPromotion">**</span>
							</span>
						</div>

          </div>
        </div>

        <div class="${ID}-basket-summary">
          <div class="Cart-Summary Cart-Saving1" ng-if="HasSavings(CartData)">
              <div class="Cart-RegularPriceLabel"><span>${_t('Regular Price')}</span></div>
              <div class="Cart-RegularPrice" ng-bind="(CartData.RegularPrice | currency)"></div>
          </div>

          <div class="Cart-Summary">
            <div class="Cart-SubTotalLabel"><span>${_t('Sub-total*')}:</span></div>
            <div class="Cart-SubTotal" ng-bind="(CartData.SubTotal | currency)"></div>
          </div>

          <div class="Cart-Extra">

            <div class="Cart-Saving2" ng-if="HasSavings(CartData)">
                <div class="Cart-SaveLabel"><span>${_t('You save')}</span></div>
                <div class="Cart-Save" ng-bind="((GetSavings(CartData) | currency) + (GetPercentageSaved(CartData)))"></div>
            </div>

            <p class="${ID}-direct-delivery">
              * ${_t('Direct delivery prices provided <span>below</span>')}
            </p>

            <div class="Cart-Asterix" ng-show="HasAnyPromotion(CartData)">
                <div class="asterix-info">
                    <span>** ${_t('Special offer discount applied')}</span>
                </div>
            </div>
            <div class="Cart-Tax" ng-if="CartData.PricesIncludesTax">
                <div class="tax-info">
                    <span>&nbsp;</span>
                </div>
            </div>

          </div>  
        </div>  
      </div>

      <div class="${ID}-comp-wrap">
        <div class="${ID}-comp">
          <div class="${ID}-comp__header">
            ${shared.VARIATION == 2 ? 
              _t('Due to COVID-19, to keep our reps safe, we have temporarily removed rep delivery as an option') : 
                _t('To avoid COVID-19 risks we recommend using direct delivery')
            }

            ${market == 'ru' ? `
              <p class="${ID}-comp__header-secondary">Бесплатно для заказов от 1500 рублей</p>
            ` : ''}
          </div>

          <div class="${ID}-comp__inner">
            <div class="${ID}-comp__go">
              <h2>${_t('Home Delivery')}</h2>
              <p>${_t('Buy online for delivery by a courier')}.</p>

              <div ng-if="Layout.Name == 'Desktop'">
                ${deliveryMethods(getMarket(), ID, freeDeliveryThreshold, `${ID}-comp__methods--desktop`)}
              </div>

              <div class="${ID}-comp__btn">
                <button class="Button" ng-click="Checkout('/checkoutmobile/login')">
                  <span>${_t('Checkout Online')}</span>
                </button>
              </div>

              <div class="${ID}-comp__logos">
                <img width="50" height="30" src="https://a57ed064b59d6d24a0db-e6a144f900fc09b8b2fc3bba00c88f87.ssl.cf3.rackcdn.com/media/2976519/maestro.png" alt="Maestro"> 
                <img width="50" height="30" src="https://a57ed064b59d6d24a0db-e6a144f900fc09b8b2fc3bba00c88f87.ssl.cf3.rackcdn.com/media/2976520/mastercard.png" alt="MasterCard"> 
                <img width="50" height="30" src="https://a57ed064b59d6d24a0db-e6a144f900fc09b8b2fc3bba00c88f87.ssl.cf3.rackcdn.com/media/2976525/visa.png" alt="Visa"> 
                <img width="50" height="30" src="https://a57ed064b59d6d24a0db-e6a144f900fc09b8b2fc3bba00c88f87.ssl.cf3.rackcdn.com/media/2976557/paypal-logo-20141.png" alt="PayPal">
              </div>

              <div ng-if="Layout.Name == 'Phone'">
                ${deliveryMethods(getMarket(), ID, freeDeliveryThreshold)}
              </div>
            </div>

            ${market != 'ru' ? `
              <div class="${ID}-comp__or">
                ${_t('or')}
              </div>
            ` : ''}
            <div class="${ID}-comp__sendto">
              <div id="SectionShare" class="share-options">
                <div ng-show="!shareSheetsSupport || false">
                    <h2>${_t('Send to your Avon Rep')}</h2>
                    <p>${_t('Send your order to your rep and they will deliver for free')}</p>

                    ${market == 'ru' ? `
                      <button class="Button ${ID}-repsend">
                        <span>ОТПРАВИТЬ ПРЕДСТАВИТЕЛЮ</span>
                      </button>
                    ` : ''}

                    <div class="custom-options">
                      <div class="xshare-button">
                        <a id="whatsappBtn" class="share-button share-button-whatsapp" ng-click="Share($event)" share-url="https://wa.me/?text=[message]" dtm-eventname="whatsapp_EA" ga-method="whatsapp">
                          <strong>
                            <img src="/Styles/Core/Images/whatsapp.svg" />
                          </strong>
                          <span>Whatsapp</span>
                        </a>
                      </div>
                      <div class="xshare-button">
                        <a id="viberBtn" class="share-button share-button-viber" ng-click="Share($event)" share-url="viber://forward?text=[message]" dtm-eventname="viber_EA" ga-method="viber">
                          <strong>
                            <img src="/Styles/Core/Images/viber.svg" />
                          </strong>
                          <span>Viber</span>
                        </a>
                      </div>
                      <div class="xshare-button">
                        <a id="smsBtn" class="share-button share-button-sms hidden" ng-click="Share($event)" share-url="sms:?body=[message]" dtm-eventname="sms_EA" ga-method="sms">
                          <strong>
                            <img src="/Styles/Core/Images/sms.svg" />
                          </strong>
                          <span>Text</span>
                        </a>
                      </div>
                      <div class="xshare-button">
                        <a id="mailtoBtn" class="share-button share-button-mailto" ng-click="Share($event)" share-url="mailto:?subject=[subject]&body=[message]" dtm-eventname="mailto_EA" ga-method="email">
                          <strong>
                            <img src="/Styles/Core/Images/email.svg" />
                          </strong>
                          <span>Email</span>
                        </a>
                      </div>
                    </div>
                </div>
                <div ng-show="shareSheetsSupport && !false" class="share-options-button">
                    <div class="share-options-label"><span>${_t('Send your order to an Avon Rep')}</span></div>
                    <button id="shareBtn" class="Button" ng-click="TriggerShareSheets()">
                        <span>${_t('Send to your Avon Rep')}</span>
                    </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    `;
  }

  // -------------------
  // Render
  // -------------------
  if(!document.querySelector(`.${ID}-comp`)) {
    const $component = $(getHtml());

    const $cartPageWrapper = $('#CartPage');
    const cartRep = $('.online-catalog-representative .name').text();
    if($cartPageWrapper.length) {
      $cartPageWrapper.prepend($component);

      if(cartRep) {
        $cartPageWrapper.prepend(`
          <div class="${ID}-repbox">${_t('You are shopping with')} <span>${cartRep.trim()}</span></div>
        `);
      }

    }

    const repSend = document.querySelector(`.${ID}-repsend`);
    const customOpts = document.querySelector(`#OnlineCatalogCartModal .Modal .ModalContent .share-options .custom-options`);

    if(repSend && customOpts) {
      repSend.addEventListener('click', () => {
        repSend.parentNode.removeChild(repSend);

        customOpts.classList.add(`${ID}-appear`);
      });
    }

    angularCompile($component, $, cartScope);
  }
};
