/**
 * BD011 - Mobile Navigation
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import settings from './shared';

import { html } from './html';
import { observer } from '../../../../../lib/utils';

export default () => {
  setup();

  let arrOne = [
    {
        "$All BrewDog": "https://www.brewdog.com/uk/shop/beer",
    },
    {
        "SUBPunk IPA": "https://www.brewdog.com/uk/punk-ipa-4-x-can"
    },
    {
        "SUBDead Pony Club": "https://www.brewdog.com/uk/dead-pony-club-4-x-can"
    },
    {
        "SUBLost Lager": "https://www.brewdog.com/uk/lost-lager-4-x-can"
    },
    {
        "SUBClockwork Tangerine": "https://www.brewdog.com/uk/clockwork-tangerine-4-x-cans"
    },
    {
        "SUBElvis Juice": "https://www.brewdog.com/uk/brewdog-elvis-juice-4-x-can"
    },
    {
      "SUBView the full range": "https://www.brewdog.com/uk/shop/beer"
    },
  ];
  let arrTwo = [
    {
        "$Bestsellers": "https://www.brewdog.com/uk/shop/best-sellers",
    },
    {
        "Advent Calendar": "https://www.brewdog.com/uk/brewdog-craft-beer-advent-calendar-2020"
    },
    {
        "12 LoneWolf Gins of Christmas": "https://www.brewdog.com/uk/12-gins-of-christmas"
    },
    {
        "Punk IPA x 48": "https://www.brewdog.com/uk/punk-ipa-48-can"
    },
    {
        "Lost Lager x 48": "https://www.brewdog.com/uk/lost-lager-48-x-can"
    },
    {
        "Headliners x 48": "https://www.brewdog.com/uk/the-headliners-48-x-can"
    },
    {
      "View all bestsellers": "https://www.brewdog.com/uk/shop/best-sellers"
    },
  ];
  let arrThree = [
    {
        "$Bundles": "https://www.brewdog.com/uk/shop/multi-beer-bundles",
    },
    {
        "Next Day Delivery Bundles": "https://www.brewdog.com/uk/shop/next-day-delivery"
    },
    {
        "Single Beer Bundles": "https://www.brewdog.com/uk/shop/single-beer-bundles"
    },
    {
        "Multi Beer Bundles": "https://www.brewdog.com/uk/shop/multi-beer-bundles"
    },
    {
        "Mixed Drink Bundles": "https://www.brewdog.com/uk/shop/beer/other-bundles"
    },
    {
        "Build Your Own Bundle": "https://www.brewdog.com/uk/shop/byob"
    },
  ];

  let arrFour = [
    {
        "$Beer Style": "#",
    },
    {
        "IPA": "https://www.brewdog.com/uk/shop/beer/ipa"
    },
    {
        "Lager": "https://www.brewdog.com/uk/shop/beer/lager"
    },
    {
        "Stout": "https://www.brewdog.com/uk/shop/beer/stout"
    },
    {
        "Sour Ale": "https://www.brewdog.com/uk/shop/overworks"
    },
    {
      "Alcahol Free": "https://www.brewdog.com/uk/shop/alcohol-free"
    },
  ];
  let arrFive = [
    {
        "$BrewDog Now": "https://www.now.brewdog.com/$BLANK",
    },
    {
        "Bar Collection": "https://www.now.brewdog.com/$BLANK"
    },
    {
        "Home Delivery": "https://www.now.brewdog.com/$BLANK"
    },
  ];
  let arrSix = [
    {
        "#DIR$Overworks": "https://www.brewdog.com/uk/shop/overworks",
    },
    {
        "#DIR$Cider": "https://www.brewdog.com/uk/shop/cider"
    },
    {
        "#DIR$Spirits": "https://www.brewdog.com/uk/shop/spirits"
    },
    {
        "#DIR$New Releases": "https://www.brewdog.com/uk/shop/new-releases"
    },
    {
        "#DIR$Merch": "https://www.brewdog.com/uk/shop/merchandise"
    },
    {
        "#DIR$This Week's Offers": "https://www.brewdog.com/uk/shop/this-weeks-offers"
    },
    {
      "#DIR$Delivery & Returns": "https://www.brewdog.com/uk/shop/returns-and-refunds"
    },

  ];
  let arr2One = [
    {
        "$Bars": "https://www.brewdog.com/uk/locations/bars",
    },
    {
        "UK": "https://www.brewdog.com/uk/bars/uk"
    },
    {
        "USA": "https://www.brewdog.com/uk/bars/usa"
    },
    {
        "International": "https://www.brewdog.com/uk/bars/global"
    },
    {
        "Coming Soon": "https://www.brewdog.com/uk/bars/coming-soon"
    }
  ];
  let arr2Two = [
    {
        "$Bar Experience": "https://www.brewdog.com/uk/locations/bar-experience",
    },
    {
        "Beer School": "https://www.brewdog.com/uk/beer-school"
    },
    {
        "Wings Wednesday": "https://www.brewdog.com/uk/wings-wednesday"
    },
    {
        "Desk Dog": "https://www.brewdog.com/uk/locations/bar-experience/desk-dog"
    },
    {
        "Pub Quiz": "https://www.brewdog.com/uk/locations/bar-experience/pub-quiz"
    }
  ];
  let arr2Three = [
    {
        "$Breweries": "https://www.brewdog.com/uk/locations/brewery",
    },
    {
        "Ellon, Scotland": "https://www.brewdog.com/uk/locations/brewery/ellon"
    },
    {
        "Berlin, Germany": "https://www.brewdog.com/uk/locations/brewery/berlin"
    },
    {
        "Columbus, Ohio": "https://www.brewdog.com/uk/locations/brewery/columbus"
    },
    {
        "Brisbane, Australia": "https://www.brewdog.com/uk/locations/brewery/brisbane"
    }
  ];
  let arr2Four = [
    {
        "$Hotels": "#",
    },
    {
        "Doghouse, Columbus": "https://www.brewdog.com/uk/locations/hotels/doghouse"
    },
    {
        "Kennels, Columbus": "https://www.brewdog.com/uk/locations/hotels/columbus"
    },
    {
        "Kennels, Aberdeen": "https://www.brewdog.com/uk/locations/hotels/aberdeen"
    }
  ];
  let arr2Five = [
    {
        "#DIR$BrewDog Now": "https://www.now.brewdog.com/$BLANK",
    },
    {
        "#DIR$Bookings and Parties": "https://www.brewdog.com/uk/bookings"
    },
    {
        "#DIR$Partnerships": "https://www.brewdog.com/uk/locations/bar-partnerships"
    }
  ];
  let arr3One = [
    {
        "$Community": "https://www.brewdog.com/uk/community",
    },
    {
        "Equity Punks": "https://www.brewdog.com/equityforpunks"
    },
    {
        "Blog": "https://www.brewdog.com/blog"
    },
    {
        "The BrewDog Network": "https://www.brewdognetwork.com/browse"
    },
    {
        "DIY Dog": "https://www.brewdog.com/uk/community/diy-dog"
    },
    {
        "Equity Punk Forum": "https://forum.brewdog.com/"
    }
  ];
  let arr3Two = [
    {
        "$Culture": "#",
    },
    {
        "Our Charter": "https://www.brewdog.com/uk/community/culture/our-charter"
    },
    {
        "BrewDog Foundation": "https://www.brewdog.com/uk/community/culture/brewdog-foundation"
    },
    {
        "Our History": "https://www.brewdog.com/uk/community/culture/our-history"
    },
    {
        "Work for us": "https://www.jobs.brewdog.com/"
    }
  ];

  let arr3Three = [
    {
        "$Tomorrow": "#",
    },
    {
        "BrewDog Tomorrow": "https://www.brewdog.com/uk/community/culture/tomorrow"
    },
    {
        "Equity for Punks Tomorrow": "https://www.brewdog.com/uk/equityforpunks/tomorrow-raise/welcome"
    }
  ];

  let arr3Four = [
    {
        "$Beer": "https://www.brewdog.com/uk/beers/headliners",
    },
    {
        "Ingredients": "https://www.brewdog.com/uk/beers/ingredients"
    },
    {
        "How We Brew": "https://www.brewdog.com/uk//beers/how-we-brew"
    }
  ];

  let arr3Five = [
    {
        "$Spirits": "https://www.brewdog.com/uk/shop/spirits",
    },
    {
        "Ingredients": "https://www.brewdog.com/uk/beers/ingredients"
    },
    {
        "How we Distill": "https://www.brewdog.com/uk//beers/how-we-brew"
    }
  ];

  const header = document.querySelector('.header');
  
  const runBuild = () => {
      const headerLinksContainer = document.querySelector('#brewdog_mobile_menu');
      if (document.querySelector('.BD011-nav')) return;

      // Clear old nav
      headerLinksContainer.innerHTML = "";

      headerLinksContainer.insertAdjacentHTML('beforeend', `
          <div>
              <div class="header__menu__image">
                  <img src="https://www.brewdog.com/static/version1601366383/frontend/Born/arcticFox/en_US/images/shield.png" alt="shield">
              </div>
              <div class="header-mobile__menu__item" data-id="brewdog-menu-1">
                  <div>
                      Buy
                  </div>

                  <img class="icon-open" src="https://www.brewdog.com/static/version1602147894/frontend/Born/arcticFox/en_US/icons/icon-minus-16.svg" alt="">
                  <img class="icon-closed" src="https://www.brewdog.com/static/version1602147894/frontend/Born/arcticFox/en_US/icons/icon-plus-16.svg" alt="">
              </div>

              <div class="BD011-nav header__menu z-10 transition-02 transition-delay-01" id="brewdog-menu-">
                  
                  ${html(arrOne)}
                  ${html(arrTwo)}
                  ${html(arrThree)}  
                  ${html(arrFour)}  
                  ${html(arrFive)}  
                  ${html(arrSix)}  
                  
              </div>

            </div>

            <div>
                <div class="header-mobile__menu__item" data-id="brewdog-menu-2">
                    <div>
                        Visit
                    </div>

                    <img class="icon-open" src="https://www.brewdog.com/static/version1602147894/frontend/Born/arcticFox/en_US/icons/icon-minus-16.svg" alt="">
                    <img class="icon-closed" src="https://www.brewdog.com/static/version1602147894/frontend/Born/arcticFox/en_US/icons/icon-plus-16.svg" alt="">
                </div>
                
                <div class="BD011-nav header__menu z-10 transition-02 transition-delay-01" id="brewdog-menu-">
                    
                    ${html(arr2One)}
                    ${html(arr2Two)}
                    ${html(arr2Three)}  
                    ${html(arr2Four)}  
                    ${html(arr2Five)}  
                
                    <div class="header__menu__collection">
                        <div class="BD-menu-image">
                            <a href="https://www.brewdog.com/uk/locations/bar-experience">
                                <span></span>

                                
                            </a>
                        </div>
                    </div>
                </div>
              <div>

              <div class="header-mobile__menu__item" data-id="brewdog-menu-3">
                  <div>
                      Explore
                  </div>
                  
                  <img class="icon-open" src="https://www.brewdog.com/static/version1602147894/frontend/Born/arcticFox/en_US/icons/icon-minus-16.svg" alt="">
                  <img class="icon-closed" src="https://www.brewdog.com/static/version1602147894/frontend/Born/arcticFox/en_US/icons/icon-plus-16.svg" alt="">
              </div>

              <div class="BD011-nav header__menu z-10 transition-02 transition-delay-01" id="brewdog-menu-">
                  
                  ${html(arr3One)}
                  ${html(arr3Two)}
                  ${html(arr3Three)}  
                  ${html(arr3Four)}  
                  ${html(arr3Five)}  
              
                  <div class="header__menu__collection">
                      <div class="BD-menu-image">
                          <a href="https://www.brewdog.com/uk/equityforpunks/tomorrow-raise/welcome">
                              <span class="BD-punk"></span>

                              
                          </a>
                      </div>
                  </div>
              </div>
              
          </div>
      `);


      // Attach toggle functions to close others
      const toggleTitles = document.querySelectorAll('#brewdog_mobile_menu .header-mobile__menu__item');
      if (toggleTitles) {
          for (let i = 0; toggleTitles.length > i; i += 1) {
              toggleTitles[i].addEventListener('click', (e) => {
                  if (e.target.classList.contains('active')) return;
                  const prevActive = document.querySelector('#brewdog_mobile_menu .header-mobile__menu__item.active');
                  prevActive ? prevActive.classList.remove('active') : null;
              });
          }
      }
  }

  // runBuild();
  window.addEventListener('load', () => {
      setTimeout(() => {
          runBuild();
      }, 3000);
  });

  
  observer.connect(header, () => {
      runBuild();
  }, {
      config: {
          attributes: true,
          subtree: true,
          childList: true,
      }
  });

};
