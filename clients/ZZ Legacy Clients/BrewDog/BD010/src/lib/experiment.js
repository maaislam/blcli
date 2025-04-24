/**
 * ID - Description
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
      "$Shop All": "https://www.brewdog.com/uk/shop/shopall",
    },
    {
      "$Shop All Beer": "https://www.brewdog.com/uk/shop/beer",
    },
    {
      "$Beer Bundles": "https://www.brewdog.com/uk/shop/multi-beer-bundles",
    },
    {
      "$Delivery & Returns": "https://www.brewdog.com/uk/shop/returns-and-refunds",
    },
  ];
  let arrTwo = [
    {
      "$BrewDog": "https://www.brewdog.com/uk/beers/headliners",
    },
    {
      "Punk IPA": "https://www.brewdog.com/uk/punk-ipa-4-can",
    },
    {
      "Dead Pony Club": "https://www.brewdog.com/uk/dead-pony-club-4-x-can",
    },
    {
      "Lost Lager": "https://www.brewdog.com/uk/lost-lager-4-x-can",
    },
    {
      "Hazy Jane": "https://www.brewdog.com/uk/hazy-jane-5",
    },
    {
      "Elvis Juice": "https://www.brewdog.com/uk/brewdog-elvis-juice-us-4-can",
    },
    {
      "View the full range": "https://www.brewdog.com/uk/shop/beer",
    },
  ];
  let arrThree = [
    {
      "$Bestsellers": "https://www.brewdog.com/uk/shop/best-sellers",
    },
    {
      "Alcohol Free x 48": "https://www.brewdog.com/uk/alcohol-free-mixed-pack-48-can",
    },
    {
      "Punk IPA x 48": "https://www.brewdog.com/uk/punk-ipa-48-can",
    },
    {
      "Lost Lager x 48": "https://www.brewdog.com/uk/lost-lager-48-x-can",
    },
    {
      "Headliners x 48": "https://www.brewdog.com/uk/the-headliners-48-x-can",
    },
    {
      "View all Bestsellers": "https://www.brewdog.com/uk/shop/best-sellers",
    },
  ];
  let arrFour = [
    {
      "$Bundles": "https://www.brewdog.com/uk/shop/multi-beer-bundles",
    },
    {
      "Single Beer Bundles": "https://www.brewdog.com/uk/shop/single-beer-bundles",
    },
    {
      "Multi Beer Bundles": "https://www.brewdog.com/uk/shop/multi-beer-bundles",
    },
    {
      "Alcohol Free Bundles": "https://www.brewdog.com/uk/shop/alcohol-free",
    },
    {
      "Build your own Bundle": "https://www.brewdog.com/uk/shop/byob",
    },
  ];
  let arrFive = [
    {
      "$Beer Style": "https://www.brewdog.com/uk/shop/shopall",
    },
    {
      "IPA": "https://www.brewdog.com/uk/shop/beer/ipa",
    },
    {
      "Lager": "https://www.brewdog.com/uk/shop/beer/lager",
    },
    {
      "Pale Ale": "https://www.brewdog.com/uk/shop/beer/ale",
    },
    {
      "Stout": "https://www.brewdog.com/uk/shop/beer/stout",
    },
    {
      "Sour Ale": "https://www.brewdog.com/uk/shop/beer/sour-beers",
    },
    {
      "Alcohol Free": "https://www.brewdog.com/uk/shop/alcohol-free",
    },
  ];
  let arrSix = [
    {
      "$Overworks": "https://www.brewdog.com/uk/shop/overworks",
    },
    {
      "$Spirits": "https://www.brewdog.com/uk/shop/spirits",
    },
    {
      "$Cider": "https://www.brewdog.com/uk/shop/cider",
    },
    {
      "$New Releases": "https://www.brewdog.com/uk/shop/new-releases",
    },
    {
      "$Merch": "https://www.brewdog.com/uk/shop/merchandise",
    },
    {
      "$Xmas Stock Clearance": "https://www.brewdog.com/uk/shop/christmas-stock-clearance",
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
        "Wings Wednesday": "https://www.brewdog.com/uk/wings-wednesday"
    },
    {
        "Vegan & Vegetarian": "https://www.brewdog.com/uk/vegan-and-vegetarian"
    },
    {
        "Desk Dog": "https://www.brewdog.com/uk/locations/bar-experience/desk-dog"
    },
    {
        "Beer School": "https://www.brewdog.com/uk/beer-school"
    },
    {
        "Students": "https://www.brewdog.com/uk/students"
    },
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
        "$Hotels": "https://www.brewdog.com/uk/locations/hotels",
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
        "$BrewDog Now": "https://www.now.brewdog.com/$BLANK",
    },
    {
        "$Bookings and Parties": "https://www.brewdog.com/uk/bookings"
    },
    {
        "$Open Arms Online Bar": "https://www.brewdog.com/uk/onlinebar"
    },
    {
        "$Bar Gift Cards": "https://www.brewdog.com/uk/bar-giftcard"
    },
    {
        "$Franchise Opportunities": "https://www.brewdog.com/uk/locations/bar-partnerships"
    },
  ];
  let arr3One = [
    {
        "$Community": "https://www.brewdog.com/uk/community",
    },
    {
        "Equity Punks": "https://www.brewdog.com/equityforpunks"
    },
    {
        "Blog": "https://www.brewdog.com/blog/$BLANK"
    },
    {
        "The BrewDog Network": "https://www.brewdognetwork.com/browse/$BLANK"
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
        "$Culture": "https://www.brewdog.com/uk/community/culture",
    },
    {
        "Our Charter": "https://www.brewdog.com/uk/community/culture/our-charter"
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
        "$Tomorrow": "https://www.brewdog.com/uk/community/culture/tomorrow",
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
        "Ingredients": "https://www.brewdog.com/uk/spirits"
    },
    {
        "How we Distill": "https://www.brewdog.com/uk/spirits"
    }
  ];

    const header = document.querySelector('.header');

    // Check logged in status
    let loggedIn = false;
    if (document.querySelector('a[href="https://www.brewdog.com/uk/customer/account/logout/"]')) {
        loggedIn = true;
    }
    
    
    const runBuild = () => {
        const headerLinksContainer = document.querySelector('ul.header__links');
        if (document.querySelector('.BD010-nav')) return;

        // Clear old nav
        headerLinksContainer.innerHTML = "";

        headerLinksContainer.insertAdjacentHTML('afterbegin', `
                <li class="header__links__link odd" data-id="brewdog-menu-1">
                    <a href="/uk/shop/beer" data-menu="menu-1" class="link menu__link">
                        Buy
                    </a>

                    <div class="BD010-nav header__menu z-10 transition-02 transition-delay-01" id="brewdog-menu-">
                        <div class="header__menu__image">
                            <img src="https://www.brewdog.com/static/version1601366383/frontend/Born/arcticFox/en_US/images/shield.png" alt="shield">
                        </div>
                    ${html(arrOne)}
                    ${html(arrTwo)}
                    ${html(arrThree)}  
                    ${html(arrFour)}  
                    ${html(arrFive)}  
                    ${html(arrSix)}  
                    </div>
                </li>

                <li class="header__links__link odd" data-id="brewdog-menu-1">
                    <a href="https://www.brewdog.com/uk/locations/bars" data-menu="menu-1" class="link menu__link">
                        Visit
                    </a>

                    <div class="BD010-nav header__menu z-10 transition-02 transition-delay-01" id="brewdog-menu-">
                        <div class="header__menu__image">
                            <img src="https://www.brewdog.com/static/version1601366383/frontend/Born/arcticFox/en_US/images/shield.png" alt="shield">
                        </div>
                        ${html(arr2One)}
                        ${html(arr2Two)}
                        ${html(arr2Three)}  
                        ${html(arr2Four)}  
                        ${html(arr2Five)}  
                    
                        <div class="header__menu__collection">
                            <div class="BD-menu-image">
                                <a href="https://www.brewdog.com/uk/bar_pages/bar/locator/filter/uk/">
                                    <span></span>

                                    <h4 class="heading">Find Your Nearest Bar</h4>
                                </a>
                            </div>
                        </div>
                    </div>
                </li>

                <li class="header__links__link odd" data-id="brewdog-menu-1">
                    <a href="https://www.brewdog.com/uk/community" data-menu="menu-1" class="link menu__link">
                        Explore
                    </a>

                    <div class="BD010-nav header__menu z-10 transition-02 transition-delay-01" id="brewdog-menu-">
                        <div class="header__menu__image">
                            <img src="https://www.brewdog.com/static/version1601366383/frontend/Born/arcticFox/en_US/images/shield.png" alt="shield">
                        </div>
                        ${html(arr3One)}
                        ${html(arr3Two)}
                        ${html(arr3Three)}  
                        ${html(arr3Four)}  
                        ${html(arr3Five)}  
                    
                        <div class="header__menu__collection">
                            <div class="BD-menu-image">
                                <a href="https://www.brewdog.com/uk/equityforpunks/tomorrow-raise/welcome">
                                    <span class="BD-punk"></span>

                                    <h4 class="heading">This Is For Tomorrow</h4>
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
                ${loggedIn ? `
                <li class="header__links__link odd" data-id="brewdog-menu-1">
                    <a href="/uk/shop/beer" data-menu="menu-1" class="link menu__link">
                        My Account
                    </a>

                    <div class="BD010-nav header__menu z-10 transition-02 transition-delay-01" id="brewdog-menu-96980">
                        <div class="header__menu__image">
                            <img src="https://www.brewdog.com/static/version1602492081/frontend/Born/arcticFox/en_US/images/shield.png" alt="shield">
                        </div>
                        <div class="header__menu__collection">
                            <div class="header__menu__header"><a href="/uk/customer/account/edit" data-menu="menu-96981" class="link menu__inner-link">
                                Account Info</a>
                            </div>
                            <div class="header__menu__item">
                                <a href="/uk/customer/account" data-menu="menu-96982" class="link menu__inner-link">
                                View My Account</a>
                            </div>
                            <div class="header__menu__item">
                                <a href="/uk/customer/address" data-menu="menu-96983" class="link menu__inner-link">
                                Address Book</a>
                            </div>
                            <div class="header__menu__item">
                                <a href="/uk/wishlist" data-menu="menu-96984" class="link menu__inner-link">
                                My Wishlist</a>
                            </div>
                        </div>
                        <div class="header__menu__collection">
                            <div class="header__menu__header"><a href="/uk/sales/order/history" data-menu="menu-96985" class="link menu__inner-link">
                                Orders &amp; Returns</a>
                            </div>
                            <div class="header__menu__item">
                                <a href="/uk/sales/order/history" data-menu="menu-96986" class="link menu__inner-link">
                                My Orders</a>
                            </div>
                            <div class="header__menu__item">
                                <a href="/uk/rma/returns/history" data-menu="menu-96987" class="link menu__inner-link">
                                My Returns</a>
                            </div>
                            <div class="header__menu__item">
                                <a href="/uk/downloadable/customer/products" data-menu="menu-96988" class="link menu__inner-link">
                                Downloadable Products</a>
                            </div>
                        </div>
                        <div class="header__menu__collection">
                            <div class="header__menu__header"><a href="/uk/locations/bar-experience/beer-visa" data-menu="menu-96989" class="link menu__inner-link">
                                Beer Visa</a>
                            </div>
                            <div class="header__menu__item">
                                <a href="/uk/brewdog-proxy/passThrough?ssoType=beervisa&amp;redirectTo=%2Fmembers%2Fbeer-visa" data-menu="menu-96990" class="link menu__inner-link">
                                Signup</a>
                            </div>
                            <div class="header__menu__item">
                                <a href="/uk/brewdog-proxy/passThrough?ssoType=beervisa&amp;redirectTo=%2Fmembers%2Fbadges/" data-menu="menu-96991" class="link menu__inner-link">
                                My Badges</a>
                            </div>
                        </div>
                        <div class="header__menu__collection">
                            <div class="header__menu__header"><a href="/uk/customer/vouchers" data-menu="menu-96992" class="link menu__inner-link">
                                Gift Card</a>
                            </div>
                            <div class="header__menu__item">
                                <a href="/uk/customer/vouchers" data-menu="menu-96993" class="link menu__inner-link">
                                My Vouchers</a>
                            </div>
                            <div class="header__menu__item">
                                <a href="/uk/storecredit/info" data-menu="menu-96994" class="link menu__inner-link">
                                Gift Card Balance</a>
                            </div>
                            <div class="header__menu__item">
                                <a href="/uk/giftcard/customer/" data-menu="menu-96995" class="link menu__inner-link">
                                Redeem Gift Card</a>
                            </div>
                        </div>
                        <div class="header__menu__collection">
                            <div class="header__menu__header"><a href="/uk/sales/equity/details" data-menu="menu-96996" class="link menu__inner-link">
                                Equity for Punks</a>
                            </div>
                            <div class="header__menu__item">
                                <a href="/uk/sales/equity/details" data-menu="menu-96997" class="link menu__inner-link">
                                Shares &amp; Benefits</a>
                            </div>
                            <div class="header__menu__item">
                                <a href="https://www.brewdog.com/uk/media/wysiwyg/brewdog_cbs_workbook.pdf" data-menu="menu-96998" class="link menu__inner-link">
                                CBS Training</a>
                            </div>
                            <div class="header__menu__item">
                                <a href="https://www.brewdog.com/uk/id-cards" data-menu="menu-96999" class="link menu__inner-link">
                                ID Cards</a>
                            </div>
                        </div>
                        <div class="header__menu__collection">
                            <div class="header__menu__header"><a href="/uk/brewdog-proxy/passThrough?ssoType=subscriptions&amp;redirectTo=%2Fmembers%2Fsubscriptions/" data-menu="menu-97000" class="link menu__inner-link">
                                Subscriptions</a>
                            </div>
                            <div class="header__menu__item">
                                <a href="/uk/brewdog-proxy/passThrough?ssoType=subscriptions&amp;redirectTo=%2Fmembers%2Fsubscriptions/" data-menu="menu-97001" class="link menu__inner-link">
                                My Subscriptions</a>
                            </div>
                            <div class="header__menu__item">
                                <a href="/uk/xnotif/stock/index/" data-menu="menu-97002" class="link menu__inner-link">
                                Out of Stock Notifications</a>
                            </div>
                        </div>
                        </div>
                </li>
                ` : ``}
        `);
    }

    // runBuild();
    runBuild();

    
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
