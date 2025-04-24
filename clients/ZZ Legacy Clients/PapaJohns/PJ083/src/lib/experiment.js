/**
 * PJ081 - Forced postcode entry (PJ072 & PJ062 iteration)
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

const activate = () => {
  window.prm.add_endRequest(function (sender, error) {
    try {
      if (sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbBasketItem") {
        run();
      }
    } catch (e) {} 
  });

  const run = () => {
    pollerLite(['body', '.fancybox-overlay #ctl00__objHeader_aCheckoutMobile'], () => {
      // -------------------------------------------
      // When checkout button clicked, rebuild lightbox
      // -------------------------------------------
      const checkoutButton = document.querySelector('#ctl00__objHeader_aCheckoutMobile');

      if(checkoutButton) {
        checkoutButton.addEventListener('click', (e) => {

          if(e.currentTarget.innerText == 'Confirm') {
            return; // Avante..
          }

          setup();

          e.preventDefault();
          e.stopPropagation();

          // Modify basket content 
          const fancyScrollable = document.querySelector('#fancyBasketMobile .fancyScrollable');
          const fancyTitle = document.querySelector('#fancyBasketMobile h2.title');

          if(fancyTitle && fancyTitle.childNodes) {
            fancyTitle.childNodes[0].textContent = 'Confirm your store';
          }

          if(fancyScrollable) {
            fancyScrollable.innerHTML = `
              <div class="${shared.ID}-box">
                <p>You have selected</p>
                <p>
                  <span class="xhighlight">${
                    document.querySelector('#ctl00__objHeader_pnlStoreCollection') ? 
                      '<img width="33" height="30" src="https://dp8v87cz8a7qa.cloudfront.net/43831/5c9ba8b09befc1553705136.png"> <span>Collection</span>' 
                      : 
                      '<img width="36" height="30" src="https://dp8v87cz8a7qa.cloudfront.net/43831/5c7679f6bfb7e1551268342.png"> <span>Delivery</span>'
                  }</span>

                  <span class="xfrom">from</span>

                  <span class="xhighlight">
                    <img width="30" height="30" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEX///8AAAD5+fnt7e3h4eH4+Pj19fUwMDDy8vKqqqrd3d15eXnJycljY2PGxsagoKCWlpZoaGjW1ta1tbUYGBhVVVVLS0vo6Oi8vLxaWlqPj493d3c0NDQcHBwrKytvb28QEBCEhIRFRUWHh4c9PT0kJCSUlJQrMMO1AAAI4ElEQVR4nO2dCXbiMAxAIZAWQoGyFALDlhbm/kccKNCWkkiytdjhzT9AbCWOrc1So2FCkrYHk253eKHbzV/aaWIztjatrPsxWjVL2W8/Jlkr9Aw5ZPmf2a5cuG+ms17eDj1TH5K8t8aE+2ZTDEJP2I1Wd0GX7spo0gk9byJPed9dvDPbQQ12n6xwWJz3HJbz0BLADN454p1ZjENLUc2k4lRw5T3SbUdKvk8Z89DS3JM/y8n3KWNka3Us8P/9ZhGRHvDUk5fvxDKWs2My1RHwqOpEseV0PNQXOtvwnzHXlO/I9CWsfOkfZQGPfIQUcL7RF/B4cITTyCcW8p0ItVKXVgI2m90gAnrbSD4U9vIle0sBjxqOtYBztVO+ilVqKmCGOpjkebb0yrXt5TuysRMxCyJgs3mwEjHMFzwxtTn7WyxXE4+9xXaTeDsr9qPi9ZNe3/sZbwYSztyndXgbDu4M9nY+fDu4P2ukLqCrOb/rT7Lqp2Xdvuu581dZwKHbdLYDdG/oDLZuz9R1w724TGXVJRro6cTJCtP0UM0d5tF3cge+OOjxmyct+RqNN/IsRs7uzowuo95u80qdwszLnTsmb9MTacmuMyCOP/XeC3LqxqoUoCJuBz2GAzApaGPoHPw0p8Wa6VN5oRmeGm4N2hpdsBXHlOZhVjAzSF6LocRIJK1Cfp12KcMKef0GlLGkQxoJYcy1mLKREQy0jdRgFwrCkIK/Rouwb4v8EV8QzPp30SgRwVkpa/Dj6v9eOAyW4iIuBYfDP+FaXBsmOEsExxxhY+0UjifckJGLu+GfUCVxAtcxxD4i6rlQ0vXRM/hVaKAONpBaYAh7tQeh7Q0zC2cyw5SBbahCiwc7fRX9JtgOIKOdYlqianwW08JF3i5yVCiu0RPIOpU4MFrIW1TOeMWODIEhkC1bUnUqpYDHFzCi4KzDnaLv8gyyhvieRWQAgzQQZLNhH4nwIt0YJNYhxjfbrwC7uU0yeWCNo8d8egq/QBEJMJ7AKayYT4eDTVKaL0IBToJ56H+ADzfKjYBzP5h/Chgs0Y84XwA3gy3r0S0wVGKWFAmmeR5YjwZ1poP6aX8FPpRZ/wp42v6REgAHXKaswD5oZBteFQD1DtaODmX27AzTr8FlyrHfwPNe2TC8BYwqMp4LOhGMjvszBTQThnIMXhcxvbED/ogMby24lcpNnwDoAGdspmDoXm76BMAdgaG3QUk8fbnpU4DUR4ZHGjosTDeaRgO6YMV42UpLwwfoh3n3fywkofHlR2gzZRjBkITGt3QhU/zZ+6mgrmRmWJyBrODHkBBSr/5LWM3jSwiqSg8h4eN/w/8SWqIjIXjiP8R5WBedRklri0gvZXiMoPhvRLYFw68PuUuN7UOlqUB+mohsfIafBoqI7KTmTiKFQkSMCBHoL5WbPgFQgWT4S0EPl2nBETC+xnkwlHMlmyuPUAATYaXvQQ82jVtASd+sVw2ds9HEnli6B5gjYPgjgr8hS0N+grJnubk6DkD32Rje0hOQX98i5esMmGnOTDEFo1px5GIwTQDwRzRLVQAvXXLTlsC7OUZWMKhasZPZC+jpRoc+mHrGngOYqb/jz54CNIUmUFdE4vFaV/9vAHc7gauk4NVD6auqpYDvWKCYC3yhxOAjwnne/EXaSMFkHf2P+ATu5rzExAvwBTL17RQu5SDiLUJurSjnCSN3u2Ru7MCVupU9UvBdAaHKCsj9Q9W6TUgRWKGNDrtyrLhOkaHFruQjxZMUS4siI4tZqNgdSzX3N1YSR+AwvIBd/lcyFLE3y70u8wO0YoxKqA0tAyC4x3WwClUaxVNbWFVFEX3mClpzYC852id46Q9RdQqvGyHuH8aLt8n6a/HyVG+ynjdcQOFKDoRKXzPBd9ohlN+TvkROaLOyEROxRWhaw7uyVgKpXJtQERfSWPJ1AEi9ckTSF0iF0xRURVozEgEnMa0piJzC9g2t4dGBuVLHtFraKlYpqRLekQ9OWJ3aM0On3xW1gOqzd6xkQK0nLL6RnqGXSV54/SUZva+SVlKdQ2enkfMc2g61ktWCXtQyu2cZnX6VMVoS7id6fhO32uIzamPRzsStMZ1iTRznvg8jwqYzcPp8TeUkELiIRCmL7rzy+EjmQ4+ubap5n5RCrfdM+8u8fStnMs/yZd+rHQ8j55kCSWcsZbeaLba9T0aLGaPjpXZysmCzUT/Uk82cuiNooJ9Bb9qM7B6D9mThOgWdMEkX/BtSQpPUCLhGhS7MLD0qVENRAQ3Lvoxgm41ZF0SXdjOSTO1a5zr2RJLCsh15EM3G9JZOkP6Alh0eTfvIXjG+LJcyjAM/jI7Cb8w1cOM7qw33JnpMTO8gXTBtJ2u+Rk+YrlP7NXrCcJ0aX8m9kpj0jj9hek3uJ2brNMwaPVHYCBhiH71isk4tOuRWYqKfGt7kLMHAjrK0mcrwaIDshlK4lw7aZoeJ3TXOSmhZKN7opCS4oaraBFJmbkkUTcVgyswtekeGRjs3L/yDigjGdYwAPELVFMwcwDgplnTuheBlAz5OmTZUlDtJOaKgvYXW1n4jHq2Ra1ApBS0vlEwQ1xOM8KkYy0n4E9FTMZ6T8Ce0BG0SUaijJYjF3Iyr3dHBWiVSWYe3CasQymGwykfwAWs7S8ImZ8YX12zYEuI76m9h6+CRGL3VsDNR0tASoDCDGeFCFHRYZkZsBkU5jN1GvfeuEOgt7CoU60/I0vK0pFbx6jK/8XRqxOW2gEHKypRjWraXjUeqdNzK2j1ul8Ca8StrdySOgUWzvrRydJw21Pf6bKPfuGio67Cxel8cNNQ6aKNlkL1vcXrWKBAziY2zf0UhnRl1UbfLQQqunQieTsIjRfPCIgxQuNFB7oHt63gQ3gLfV1zHGIFxBTwW63oQ3gJkTcWQ8SRB5clfD78ThQprsc4n/W9KQ4sCpbgjoiSRwbABiAl3yk3NVZkSfjlRow3z+tO5iUrVXlcro/P84AIe9bcvFXX/CLpaGVfPzeFRBfzy9j+ugGcRp3UKT7gzbu4ew5yoZmwt4D8iBHl1OoaiiwAAAABJRU5ErkJggg==">
                    Barnet
                  </span>
                </p>

                <p class="xchange-wrap">
                  <a class="xchange" href="/?selectstore=1">Change *</a>
                </p>

                <p class="xinfo">
                  * please note this will restart your order
                </p>
              </div>
            `;
          }

          e.currentTarget.innerText = 'Confirm';
        });
      }
    }, {
      multiplier: 1,
    });
  };

};

export default activate;
