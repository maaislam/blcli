/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { events } from '../../../../../lib/utils';
import globalVariables from './productData';
// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;

export default () => {
    setup();

    // -----------------------------
    // Add events that apply to both variant and control
    // -----------------------------
    // ...
    fireEvent('Conditions Met');
    // -----------------------------
    // If control, bail out from here
    // -----------------------------
    if (shared.VARIATION == 'control') {
        return;
    }

    // Write experiment code here
    // ...
    var isEchoVariantOutfitGenerator = {
        init: function init() {
            isEchoVariantOutfitGenerator.mainJs();
        },

        mainJs: function mainJs() {
            isEchoVariantOutfitGenerator.bootFunction();
            isEchoVariantOutfitGenerator.insertHtml();
            isEchoVariantOutfitGenerator.clickFunction();
        },
        waitForEl: function waitForEl(selector, callback) {
            var count = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            if (document.querySelector(selector) != null) {
                callback();
            } else if (count < 10000) {
                setTimeout(function() {
                    isEchoVariantOutfitGenerator.waitForEl(selector, callback, ++count);
                }, 100);
            }
        },
        convetToClass: function convetToClass(text) {
            return text.replace(' ', '-').toLowerCase();
        },
        bootFunction: function bootFunction(text) {
            document.body.classList.add('bl-og-visible-group-0');
        },
        shuffleFunction: function shuffleFunction() {
            if (globalVariables.visibleIndex === 9) {
                globalVariables.visibleIndex = 0;
            } else {
                globalVariables.visibleIndex++;
            }

            document.querySelector('.bl-og-main-div-image').style.backgroundImage = "url('".concat(
                globalVariables.productsDetails[globalVariables.visibleIndex].section.imageUrl,
                "')"
            );
            isEchoVariantOutfitGenerator.updateImageName();

            for (i = 0; i < 10; i++) {
                document.body.classList.remove('bl-og-visible-group-' + i);
            }

            document.body.classList.add('bl-og-visible-group-' + globalVariables.visibleIndex);
            fireEvent('click- suffle Outfits');
        },
        updateImageName: function updateImageName() {
            var firstName = globalVariables.productsDetails[globalVariables.visibleIndex].section.name;

            document.querySelector('.bl-og-image-container-text-first').innerHTML = firstName;
        },
        insertAfter: function insertAfter(referenceNode, newNode) {
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        },
        insertHtml: function insertHtml() {
            // var mainHtml =
            //   '  <div class="bl-og-main-div-container">\n       <div class="bl-og-main-div">\n           <div class="bl-og-main-div-image-container">\n         \n \n           <div class="bl-og-main-div-image" style="background-image: url(\''.concat(
            //     globalVariables.productsDetails[0].section.imageUrl,
            //     '\')"></div>   \n           </div>\n \n           <div class="bl-og-selection-div-container">\n           <div class="bl-og-main-div-image-container-text">\n \n           <div class="bl-og-image-container-text-first">DECLAN RICE</div>\n           \n               </div>\n               <div class="bl-og-selection-headline">SHOP THE TALENT</div>\n               <div class="bl-og-selection-sub-title">\n                   Go All Out this holiday season\n               </div>\n \n               <div class="bl-og-selection-suffle-button-container">\n                   <button class="bl-og-selection-suffle-button">\n                       <div class="bl-og-selection-suffle-button-icon">\n                           <svg xmlns="http://www.w3.org/2000/svg" width="22" height="17" viewBox="0 0 22 17"\n                               fill="none">\n                               <path\n                                   d="M21.9496 13.645C21.9281 13.6944 21.898 13.7396 21.8606 13.7785L19.2563 16.3827C19.2186 16.4202 19.1737 16.4499 19.1245 16.47C19.0752 16.4901 19.0224 16.5003 18.9692 16.5C18.916 16.5003 18.8632 16.4901 18.814 16.47C18.7647 16.4499 18.7199 16.4202 18.6821 16.3827C18.6068 16.307 18.5645 16.2045 18.5645 16.0976C18.5645 15.9908 18.6068 15.8883 18.6821 15.8125L20.5989 13.8957H16.2194C15.6013 13.8963 14.9921 13.7477 14.4437 13.4626C13.8953 13.1775 13.4238 12.7642 13.0692 12.2579L10.9219 9.20481L8.49553 12.6623C8.13991 13.1695 7.66704 13.5832 7.11717 13.8684C6.56729 14.1535 5.95667 14.3016 5.33725 14.3001H0.423921C0.31667 14.3001 0.213812 14.2575 0.137974 14.1817C0.0621365 14.1058 0.0195312 14.003 0.0195312 13.8957C0.0195312 13.7885 0.0621365 13.6856 0.137974 13.6098C0.213812 13.5339 0.31667 13.4913 0.423921 13.4913H5.33725C5.8252 13.491 6.30591 13.3732 6.73877 13.148C7.17163 12.9228 7.54394 12.5967 7.82425 12.1973L10.4285 8.50117L7.83234 4.80505C7.55124 4.40453 7.17764 4.07775 6.74327 3.85247C6.30889 3.62719 5.82657 3.51005 5.33725 3.511H0.423921C0.31667 3.511 0.213812 3.4684 0.137974 3.39256C0.0621365 3.31672 0.0195312 3.21386 0.0195312 3.10661C0.0195312 2.99936 0.0621365 2.8965 0.137974 2.82067C0.213812 2.74483 0.31667 2.70222 0.423921 2.70222H5.33725C5.9553 2.70199 6.5643 2.85072 7.11267 3.13581C7.66103 3.42091 8.13261 3.83397 8.48745 4.34L10.9138 7.79753L13.0611 4.74439C13.4157 4.23811 13.8872 3.82487 14.4356 3.53975C14.9841 3.25463 15.5932 3.10604 16.2113 3.10661H20.5989L18.6821 1.18981C18.6068 1.11404 18.5645 1.01155 18.5645 0.904712C18.5645 0.797878 18.6068 0.695385 18.6821 0.619618C18.7197 0.581715 18.7644 0.55163 18.8137 0.5311C18.863 0.51057 18.9158 0.5 18.9692 0.5C19.0226 0.5 19.0755 0.51057 19.1247 0.5311C19.174 0.55163 19.2187 0.581715 19.2563 0.619618L21.8606 3.24411C21.898 3.28294 21.9281 3.32813 21.9496 3.37755C21.99 3.47601 21.99 3.58644 21.9496 3.68489C21.9261 3.73321 21.8962 3.77811 21.8606 3.81834L19.2563 6.42261C19.2186 6.46009 19.1737 6.48974 19.1245 6.50986C19.0752 6.52999 19.0224 6.54019 18.9692 6.53988C18.916 6.54019 18.8632 6.52999 18.814 6.50986C18.7647 6.48974 18.7199 6.46009 18.6821 6.42261C18.6442 6.38501 18.6141 6.34029 18.5936 6.29101C18.5731 6.24173 18.5625 6.18887 18.5625 6.13549C18.5625 6.08211 18.5731 6.02925 18.5936 5.97997C18.6141 5.93069 18.6442 5.88597 18.6821 5.84837L20.5989 3.93561H16.2194C15.7307 3.93531 15.2492 4.05276 14.8156 4.27801C14.382 4.50327 14.009 4.8297 13.7283 5.22966L11.4031 8.50117L13.7122 11.7929C13.9929 12.1929 14.3658 12.5193 14.7994 12.7445C15.2331 12.9698 15.7146 13.0872 16.2032 13.0869H20.5989L18.6821 11.1742C18.6444 11.1365 18.6145 11.0917 18.5941 11.0425C18.5737 10.9932 18.5632 10.9404 18.5632 10.8871C18.5632 10.8337 18.5737 10.7809 18.5941 10.7317C18.6145 10.6824 18.6444 10.6377 18.6821 10.5999C18.7198 10.5622 18.7646 10.5323 18.8138 10.5119C18.8631 10.4915 18.9159 10.481 18.9692 10.481C19.0225 10.481 19.0753 10.4915 19.1246 10.5119C19.1739 10.5323 19.2186 10.5622 19.2563 10.5999L21.8606 13.2042C21.8962 13.2444 21.9261 13.2893 21.9496 13.3377C21.99 13.4361 21.99 13.5466 21.9496 13.645Z"\n                                   fill="black" />\n                           </svg>\n                       </div>\n                       <div class="bl-og-selection-suffle-button-text">\n                           Shuffle outfits\n                       </div>\n                   </button>\n               </div>\n \n \n           </div>\n       </div>\n   </div>\n \n   <div class="bl-og-item-group-holder-desktop">\n       \n   </div>\n \n   \n   <div class="bl-og-item-group-holder-mobile">\n      \n       </div> '
            //   );

            var mainHtml = `  <div class="bl-og-main-div-container">      
                          <div class="bl-og-main-div">          
                              <div class="bl-og-main-div-image-container">          
                                  <div class="bl-og-main-div-image" style="background-image: url(${globalVariables.productsDetails[0].section.imageUrl}"></div>  
                
                              </div>       
                              <div class="bl-og-selection-div-container">         
                              <div class="bl-og-selection-headline">SHOP THE TALENT</div>             
                                  <div class="bl-og-main-div-image-container-text">           
                                      <div class="bl-og-image-container-text-first">DECLAN RICE</div>        
                                  </div>             
                                  <div class="bl-og-selection-sub-title">                   Go All Out this holiday season               </div>   
                                  <div class="bl-og-selection-suffle-button-container">         
                                        <button class="bl-og-selection-suffle-button">              
                                             <div class="bl-og-selection-suffle-button-icon">         
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="17" viewBox="0 0 22 17"                               fill="none">                             
                                                         <path  d="M21.9496 13.645C21.9281 13.6944 21.898 13.7396 21.8606 13.7785L19.2563 16.3827C19.2186 16.4202 19.1737 16.4499 19.1245 16.47C19.0752 16.4901 19.0224 16.5003 18.9692 16.5C18.916 16.5003 18.8632 16.4901 18.814 16.47C18.7647 16.4499 18.7199 16.4202 18.6821 16.3827C18.6068 16.307 18.5645 16.2045 18.5645 16.0976C18.5645 15.9908 18.6068 15.8883 18.6821 15.8125L20.5989 13.8957H16.2194C15.6013 13.8963 14.9921 13.7477 14.4437 13.4626C13.8953 13.1775 13.4238 12.7642 13.0692 12.2579L10.9219 9.20481L8.49553 12.6623C8.13991 13.1695 7.66704 13.5832 7.11717 13.8684C6.56729 14.1535 5.95667 14.3016 5.33725 14.3001H0.423921C0.31667 14.3001 0.213812 14.2575 0.137974 14.1817C0.0621365 14.1058 0.0195312 14.003 0.0195312 13.8957C0.0195312 13.7885 0.0621365 13.6856 0.137974 13.6098C0.213812 13.5339 0.31667 13.4913 0.423921 13.4913H5.33725C5.8252 13.491 6.30591 13.3732 6.73877 13.148C7.17163 12.9228 7.54394 12.5967 7.82425 12.1973L10.4285 8.50117L7.83234 4.80505C7.55124 4.40453 7.17764 4.07775 6.74327 3.85247C6.30889 3.62719 5.82657 3.51005 5.33725 3.511H0.423921C0.31667 3.511 0.213812 3.4684 0.137974 3.39256C0.0621365 3.31672 0.0195312 3.21386 0.0195312 3.10661C0.0195312 2.99936 0.0621365 2.8965 0.137974 2.82067C0.213812 2.74483 0.31667 2.70222 0.423921 2.70222H5.33725C5.9553 2.70199 6.5643 2.85072 7.11267 3.13581C7.66103 3.42091 8.13261 3.83397 8.48745 4.34L10.9138 7.79753L13.0611 4.74439C13.4157 4.23811 13.8872 3.82487 14.4356 3.53975C14.9841 3.25463 15.5932 3.10604 16.2113 3.10661H20.5989L18.6821 1.18981C18.6068 1.11404 18.5645 1.01155 18.5645 0.904712C18.5645 0.797878 18.6068 0.695385 18.6821 0.619618C18.7197 0.581715 18.7644 0.55163 18.8137 0.5311C18.863 0.51057 18.9158 0.5 18.9692 0.5C19.0226 0.5 19.0755 0.51057 19.1247 0.5311C19.174 0.55163 19.2187 0.581715 19.2563 0.619618L21.8606 3.24411C21.898 3.28294 21.9281 3.32813 21.9496 3.37755C21.99 3.47601 21.99 3.58644 21.9496 3.68489C21.9261 3.73321 21.8962 3.77811 21.8606 3.81834L19.2563 6.42261C19.2186 6.46009 19.1737 6.48974 19.1245 6.50986C19.0752 6.52999 19.0224 6.54019 18.9692 6.53988C18.916 6.54019 18.8632 6.52999 18.814 6.50986C18.7647 6.48974 18.7199 6.46009 18.6821 6.42261C18.6442 6.38501 18.6141 6.34029 18.5936 6.29101C18.5731 6.24173 18.5625 6.18887 18.5625 6.13549C18.5625 6.08211 18.5731 6.02925 18.5936 5.97997C18.6141 5.93069 18.6442 5.88597 18.6821 5.84837L20.5989 3.93561H16.2194C15.7307 3.93531 15.2492 4.05276 14.8156 4.27801C14.382 4.50327 14.009 4.8297 13.7283 5.22966L11.4031 8.50117L13.7122 11.7929C13.9929 12.1929 14.3658 12.5193 14.7994 12.7445C15.2331 12.9698 15.7146 13.0872 16.2032 13.0869H20.5989L18.6821 11.1742C18.6444 11.1365 18.6145 11.0917 18.5941 11.0425C18.5737 10.9932 18.5632 10.9404 18.5632 10.8871C18.5632 10.8337 18.5737 10.7809 18.5941 10.7317C18.6145 10.6824 18.6444 10.6377 18.6821 10.5999C18.7198 10.5622 18.7646 10.5323 18.8138 10.5119C18.8631 10.4915 18.9159 10.481 18.9692 10.481C19.0225 10.481 19.0753 10.4915 19.1246 10.5119C19.1739 10.5323 19.2186 10.5622 19.2563 10.5999L21.8606 13.2042C21.8962 13.2444 21.9261 13.2893 21.9496 13.3377C21.99 13.4361 21.99 13.5466 21.9496 13.645Z"   fill="black" />
                                                        </svg>                       
                                              </div>                      
                                              <div class="bl-og-selection-suffle-button-text">Shuffle outfits </div>                  
                                         </button>               
                                   </div>          
                               </div>      
                            </div>  
                        </div>  
                        <div class="bl-og-item-group-holder-desktop"> </div> 
                        <div class="bl-og-item-group-holder-mobile"></div> `;
            var e = document.createElement('div');
            e.classList.add('smartzerVideoSection');
            e.innerHTML = mainHtml;
            var div = document.querySelectorAll('div#goAllOutVideo')[0];
            isEchoVariantOutfitGenerator.insertAfter(div, e);
            isEchoVariantOutfitGenerator.insertProductGroupDesktop();
            isEchoVariantOutfitGenerator.insertProductGroupMobile();

            document
                .querySelectorAll('.bl-og-product-div-container.bl-og-product-div-container-desktop .bl-og-product-div-item')
                .forEach((item, index) => {
                    item.addEventListener('click', function(e) {
                        e.preventDefault();

                        var sudoClick = e.target.closest('.bl-og-product-div-item');

                        sudoClick.querySelector('[class="bl-og-add-to-wishlist-icon hotspotbuy hotspotquickbuy"]').click();
                    });
                });

            document
                .querySelectorAll('.bl-og-product-div-container.bl-og-product-div-container-mobile .bl-og-product-div-item')
                .forEach((item, index) => {
                    item.addEventListener('click', function(e) {
                        e.preventDefault();
                        var sudoClick = e.target.closest('.bl-og-product-div-item');

                        sudoClick.querySelector('[class="bl-og-add-to-wishlist-icon hotspotbuy hotspotquickbuy"]').click();
                    });
                });

            document.body.addEventListener('click', (e) => {
                if (
                    (e.target.matches('#hsAddToBagContainer') || e.target.closest('#hsAddToBagContainer')) &&
                    document.querySelector('#hsSizeDdl').value != ''
                ) {
                    fireEvent(`Click - Modal Add to Basket`);
                } else if (e.target.closest('#hsViewProduct')) {
                    fireEvent(`Click - Product Opened- ${e.target.closest('#hsViewProduct').querySelector('a').getAttribute('href')}`);
                }
            });
            fireEvent('Experiment seen');
        },
        onQuickBuy: function onQuickBuy(e) {
            var $hotspotsbuy = $('div.hotspotbuy');
            var wishlistVal = $(e.currentTarget).data('iswishlist');
            isWishListClicked = wishlistVal != null && wishlistVal.toString().toLowerCase() == 'true';

            if (isWishListClicked) {
                var userLoggedInVal = $(e.currentTarget).data('userloggedin');

                if (userLoggedInVal != null && userLoggedInVal.toString().toLowerCase() == 'false') {
                    window.location = window.location.origin + '/Login?addto=wishlist&returnurl=' + window.location.pathname;
                    return;
                }
            } else {
                configureGtmForHotspotQuickBuy(12174303);
                fireEvent(`Click - Product Modal Opened`);
            }

            showHotSpotPurchaseDetails($(e.currentTarget));
        },
        insertProductGroupDesktop: function insertProductGroupDesktop() {
            globalVariables.productsDetails.forEach(function(section, index) {
                var items = '';
                Object.keys(section.sectionProducts).forEach(function(product) {
                    items += '<div class="bl-og-product-div-item">\n               <div  data-colourvariantid="'
                        .concat(
                            product,
                            '" data-iswishlist="false"  class="bl-og-add-to-wishlist-icon hotspotbuy hotspotquickbuy">\n               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="23" viewBox="0 0 20 23" fill="none">\n               <g opacity="0.8">\n               <path d="M14.5002 7.75137V5.50021C14.5002 4.30668 14.0261 3.16203 13.1821 2.31808C12.3382 1.47413 11.1935 1 10 1C8.80647 1 7.66182 1.47413 6.81787 2.31808C5.97392 3.16203 5.49979 4.30668 5.49979 5.50021V7.75053H10L14.5002 7.75137ZM2.12474 7.75053H17.8753L19 21.2507H1L2.12474 7.75053Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n               <path fill-rule="evenodd" clip-rule="evenodd" d="M10.8087 10.9849C10.8087 10.6936 10.5726 10.4575 10.2813 10.4575C9.99007 10.4575 9.75396 10.6936 9.75396 10.9849V13.9732H6.76563C6.47439 13.9732 6.23828 14.2093 6.23828 14.5006C6.23828 14.7918 6.47439 15.0279 6.76563 15.0279H9.75396V18.0162C9.75396 18.3075 9.99007 18.5436 10.2813 18.5436C10.5726 18.5436 10.8087 18.3075 10.8087 18.0162V15.0279H13.797C14.0882 15.0279 14.3243 14.7918 14.3243 14.5006C14.3243 14.2093 14.0882 13.9732 13.797 13.9732H10.8087V10.9849Z" fill="black"/>\n               </g>\n               </svg>\n               </div>\n               <a href="'
                        )
                        .concat(
                            section.sectionProducts[product].productUrl,
                            '" class="bl-og-product-image-container">\n                   <img src="'
                        )
                        .concat(
                            section.sectionProducts[product].productImage,
                            '" alt=""\n                       class="bl-og-product-image">\n               </a>\n               <div class="bl-og-product-info-container">\n                   <div class="bl-og-product-brand-name">\n                   '
                        )
                        .concat(section.sectionProducts[product].brand, '\n                   </div>\n \n                   <a href="')
                        .concat(section.sectionProducts[product].productUrl, '" class="bl-og-product-name">\n                   ')
                        .concat(
                            section.sectionProducts[product].productName,
                            '\n                   </a>\n                   <div class="bl-og-product-price">\n                       <div class="bl-og-product-price-current">\n                          '
                        )
                        .concat(
                            section.sectionProducts[product].price,
                            `\n                       </div>\n           <div class="bl-og-product-price-discount">\n                          `
                        )
                        .concat(
                            section.sectionProducts[product].previousPrice ? section.sectionProducts[product].previousPrice : '',
                            '\n                       </div>\n                   </div>\n               </div>\n \n               </div>'
                        );
                });
                var groupHtml =
                    ' <div class="bl-og-product-div-container bl-og-product-div-container-desktop ">\n                           <div class="bl-og-product-div-items">\n                               '.concat(
                        items,
                        '\n                           </div>\n                       </div>'
                    );

                var node = document.createElement('div');
                node.classList.add('bl-og-group-'.concat(index));
                node.innerHTML = groupHtml;
                document.querySelector('.bl-og-item-group-holder-desktop').appendChild(node);
            });
        },
        insertProductGroupMobile: function insertProductGroupMobile() {
            globalVariables.productsDetails.forEach(function(section, index) {
                var items = '';
                Object.keys(section.sectionProducts).forEach(function(product) {
                    items += '<div class="bl-og-product-div-item swiper-slide">\n               <div data-colourvariantid="'
                        .concat(
                            product,
                            '" data-iswishlist="false"  class="bl-og-add-to-wishlist-icon hotspotbuy hotspotquickbuy">\n               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="23" viewBox="0 0 20 23" fill="none">\n               <g opacity="0.8">\n               <path d="M14.5002 7.75137V5.50021C14.5002 4.30668 14.0261 3.16203 13.1821 2.31808C12.3382 1.47413 11.1935 1 10 1C8.80647 1 7.66182 1.47413 6.81787 2.31808C5.97392 3.16203 5.49979 4.30668 5.49979 5.50021V7.75053H10L14.5002 7.75137ZM2.12474 7.75053H17.8753L19 21.2507H1L2.12474 7.75053Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n               <path fill-rule="evenodd" clip-rule="evenodd" d="M10.8087 10.9849C10.8087 10.6936 10.5726 10.4575 10.2813 10.4575C9.99007 10.4575 9.75396 10.6936 9.75396 10.9849V13.9732H6.76563C6.47439 13.9732 6.23828 14.2093 6.23828 14.5006C6.23828 14.7918 6.47439 15.0279 6.76563 15.0279H9.75396V18.0162C9.75396 18.3075 9.99007 18.5436 10.2813 18.5436C10.5726 18.5436 10.8087 18.3075 10.8087 18.0162V15.0279H13.797C14.0882 15.0279 14.3243 14.7918 14.3243 14.5006C14.3243 14.2093 14.0882 13.9732 13.797 13.9732H10.8087V10.9849Z" fill="black"/>\n               </g>\n               </svg>\n               </div>\n               <a href="'
                        )
                        .concat(
                            section.sectionProducts[product].productUrl,
                            '" class="bl-og-product-image-container">\n                   <img src="'
                        )
                        .concat(
                            section.sectionProducts[product].productImage,
                            '" alt=""\n                       class="bl-og-product-image">\n               </a>\n               <div class="bl-og-product-info-container">\n                   <div class="bl-og-product-brand-name">\n                   '
                        )
                        .concat(section.sectionProducts[product].brand, '\n                   </div>\n \n                   <a href="')
                        .concat(section.sectionProducts[product].productUrl, '" class="bl-og-product-name">\n                   ')
                        .concat(
                            section.sectionProducts[product].productName,
                            '\n                   </a>\n                   <div class="bl-og-product-price">\n                       <div class="bl-og-product-price-current">\n                          '
                        )
                        .concat(
                            section.sectionProducts[product].price,
                            '\n                       </div>\n                       <div class="bl-og-product-price-discount">\n                          '
                        )
                        .concat(
                            section.sectionProducts[product].previousPrice,
                            '\n                       </div>\n                   </div>\n               </div>\n \n               </div>'
                        );
                });
                var groupHtml =
                    ' <div class="bl-og-product-div-container bl-og-product-div-container-mobile  swiper ">\n                           <div class="bl-og-product-div-items swiper-wrapper">\n                               '.concat(
                        items,
                        '\n                           </div>\n                           <div class="swiper-button-next">\n                           <div class="swiper-button-next-icon">\n                               <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">\n                                   <g filter="url(#filter0_d_240_1491)">\n                                       <rect x="4" width="48" height="48" fill="white" />\n                                       <path d="M37 24H19M29.5 16.5L37 24L29.5 16.5ZM37 24L29.5 31.5L37 24Z" stroke="#0000ED"\n                                           stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />\n                                   </g>\n                                   <defs>\n                                       <filter id="filter0_d_240_1491" x="0" y="0" width="56" height="56" filterUnits="userSpaceOnUse"\n                                           color-interpolation-filters="sRGB">\n                                           <feFlood flood-opacity="0" result="BackgroundImageFix" />\n                                           <feColorMatrix in="SourceAlpha" type="matrix"\n                                               values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />\n                                           <feOffset dy="4" />\n                                           <feGaussianBlur stdDeviation="2" />\n                                           <feComposite in2="hardAlpha" operator="out" />\n                                           <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />\n                                           <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_240_1491" />\n                                           <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_240_1491"\n                                               result="shape" />\n                                       </filter>\n                                   </defs>\n                               </svg>\n                           </div>\n                       </div>\n                       <div class="swiper-button-prev">\n                           <div class="swiper-button-prev-icon">\n                               <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">\n                                   <g filter="url(#filter0_d_240_1491)">\n                                       <rect x="4" width="48" height="48" fill="white" />\n                                       <path d="M37 24H19M29.5 16.5L37 24L29.5 16.5ZM37 24L29.5 31.5L37 24Z" stroke="#0000ED"\n                                           stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />\n                                   </g>\n                                   <defs>\n                                       <filter id="filter0_d_240_1491" x="0" y="0" width="56" height="56" filterUnits="userSpaceOnUse"\n                                           color-interpolation-filters="sRGB">\n                                           <feFlood flood-opacity="0" result="BackgroundImageFix" />\n                                           <feColorMatrix in="SourceAlpha" type="matrix"\n                                               values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />\n                                           <feOffset dy="4" />\n                                           <feGaussianBlur stdDeviation="2" />\n                                           <feComposite in2="hardAlpha" operator="out" />\n                                           <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />\n                                           <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_240_1491" />\n                                           <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_240_1491"\n                                               result="shape" />\n                                       </filter>\n                                   </defs>\n                               </svg>\n                           </div>\n                       </div>\n                       </div>'
                    );
                var node = document.createElement('div');

                node.classList.add('bl-og-group-'.concat(index));
                node.innerHTML = groupHtml;

                document.querySelector('.bl-og-item-group-holder-mobile').appendChild(node);
                window['swiper'.concat(index)] = new Swiper('.bl-og-group-'.concat(index, ' .bl-og-product-div-container-mobile'), {
                    slidesPerView: 'auto',
                    navigation: {
                        nextEl: '.bl-og-group-'.concat(index, ' .swiper-button-next'),
                        prevEl: '.bl-og-group-'.concat(index, ' .swiper-button-prev'),
                    },
                });
            });
        },
        clickFunction: function clickFunction() {
            document.querySelector('.bl-og-selection-suffle-button').addEventListener('click', function() {
                isEchoVariantOutfitGenerator.shuffleFunction();
            });
            $(document).on('click', '.bl-og-add-to-wishlist-icon', isEchoVariantOutfitGenerator.onQuickBuy);
            document.body.addEventListener('click', function(e) {
                if (e.target.getAttribute('id') == 'addHotspotToBag' || e.target.classList.contains('innerHotSpotLine')) {
                    // document.querySelectorAll('#hsSizeDdl option').forEach(function (option) {
                    //   if (option.outerHTML.includes('selected')) {
                    //     fireEvent('click Button- Add To Bag');
                    //   }
                    // });
                }
            });
        },
    };

    (function isPollFnOutfitGenerator() {
        if (document.querySelector('body') && document.querySelector('div#goAllOutVideo') && window.jQuery !== undefined) {
            try {
                if (document.querySelector('body.'.concat(ID, '-bl-og')) === null) {
                    document.body.classList.add(''.concat(ID, '-bl-og'));
                    isEchoVariantOutfitGenerator.init();
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            setTimeout(isPollFnOutfitGenerator, 25);
        }
    })();
};