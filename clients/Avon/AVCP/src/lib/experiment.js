/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const addToRoutine = (e) => {
  const jason = JSON.parse(e.getAttribute('data-json'));

  let routine = JSON.parse(localStorage.getItem('routine') || '[]');

  routine.push(jason);

  localStorage.setItem('routine', JSON.stringify(routine));
  
  e.innerHTML = `
    <span>✓</span>
    Added to your routine
  `;
  e.classList.add('added');
};

const prods = [
  // Q1
  [
    {
      image: 'https://www.shopwithmyrep.co.uk//assets/en-gb/images/product/prod_1203539_1_613x613.jpg',
      url: 'https://www.shopwithmyrep.co.uk/product/13830/nutra-effects-mattifying-fluffy-foam-cleanser-150ml',
      title: 'Nutra Effects Mattifying Fluffy Foam Cleanser',
      price: '£3.50',
      sku: '13830',
    },
    {
      image: 'https://www.shopwithmyrep.co.uk//assets/en-gb/images/product/prod_1203654_1_613x613.jpg',
      url: 'https://www.shopwithmyrep.co.uk/product/13835/nutra-effects-soothing-micellar-gel-cleanser-180ml',
      title: 'Nutra effects soothing micellar gel cleanser',
      rrp: '£3.00',
      price: '£2.00',
      sku: '13835',
    },
    {
      image: 'https://www.shopwithmyrep.co.uk//assets/en-gb/images/product/prod_1194423_1_613x613.jpg',
      url: 'https://www.shopwithmyrep.co.uk/product/5683/clearskin-blemish-clearing-fresh-bubble-cleanser-150ml',
      title: 'Clearskin Blemish Clearing Fresh Bubble Cleanser ',
      price: '£3.50',
      sku: '5683',
    },
  ],
  [
    {
      image: 'https://www.shopwithmyrep.co.uk//assets/en-gb/images/product/prod_1194440_1_613x613.jpg',
      url: 'https://www.shopwithmyrep.co.uk/product/5689/clearskin-blackhead-clearing-face-toner-100ml',
      title: 'Clearskin Blackhead Clearing Face Toner',
      price: '£2.50',
      sku: '5689',
    },
    {
      image: 'https://www.shopwithmyrep.co.uk//assets/en-gb/images/product/prod_1225551_1_613x613.jpg',
      url: 'https://www.shopwithmyrep.co.uk/product/17133/clearskin-pore-shine-control-mattifying-charcoal-toner',
      title: 'Clearskin Pore & Shine Control Mattifying Charcoal Toner',
      price: '£2.50',
      sku: '17133',
    },
    {
      image: 'https://www.shopwithmyrep.co.uk//assets/en-gb/images/product/prod_1221205_1_613x613.jpg',
      url: 'https://www.shopwithmyrep.co.uk/product/13802/anew-vitamin-c-radiance-tonic-200ml',
      title: 'Anew Vitamin C Radiance Tonic',
      price: '£10.00',
      sku: '13802',
    },
  ],
  [
    {
      image: 'https://www.shopwithmyrep.co.uk//assets/en-gb/images/product/prod_1204402_1_613x613.jpg',
      url: 'https://www.shopwithmyrep.co.uk/product/16309/anew-radiance-maximising-serum-30ml',
      title: 'Anew Radiance Maximising Serum',
      price: '£2.00',
      sku: '16309',
    },
    {
      image: 'https://www.shopwithmyrep.co.uk//assets/en-gb/images/product/prod_1204407_1_613x613.jpg',
      url: 'https://www.shopwithmyrep.co.uk/product/16419/anew-anti-wrinkle-smoothing-serum-30ml',
      title: 'Anew Anti-Wrinkle Smoothing Serum',
      price: '£25.00',
      sku: '16419',
    },
    {
      image: 'https://www.shopwithmyrep.co.uk//assets/en-gb/images/product/prod_1221489_1_613x613.jpg',
      url: 'https://www.shopwithmyrep.co.uk/product/17356/cannabis-sativa-oil-illuminate-calm-face-essence-30ml',
      title: 'Cannabis Sativa Oil Illuminate & Calm Face Essence',
      rrp: '£12.00',
      price: '£9.00',
      sku: '17356',
    },
  ],
  [
    {
      image: 'https://www.shopwithmyrep.co.uk//assets/en-gb/images/product/prod_1204411_1_613x613.jpg',
      url: 'https://www.shopwithmyrep.co.uk/product/16421/anew-lifting-dual-eye-system-20ml',
      title: 'Anew Lifting Dual Eye System',
      price: '£12.00',
      sku: '16421',
    },
    {
      image: 'https://www.shopwithmyrep.co.uk//assets/en-gb/images/product/prod_1198293_1_613x613.jpg',
      url: 'https://www.shopwithmyrep.co.uk/product/12306/anew-instant-eye-smoother-15ml',
      title: 'Anew Instant Eye Smoother',
      price: '£14.00',
      sku: '12306',
    },
  ],
  [
    {
      image: 'https://www.shopwithmyrep.co.uk//assets/en-gb/images/product/prod_1204049_1_613x613.jpg',
      url: 'https://www.shopwithmyrep.co.uk/product/14660/nutra-effects-soothe-hydrating-day-cream-spf20-50ml',
      title: 'Nutra Effects Soothe Hydrating Day Cream SPF20',
      price: '£5.00',
      sku: '14660',
    },
    {
      image: 'https://www.shopwithmyrep.co.uk//assets/en-gb/images/product/prod_1222076_1_613x613.jpg',
      url: 'https://www.shopwithmyrep.co.uk/product/15075/lisa-armstrong-all-about-the-base-priming-moisturiser',
      title: 'Lisa Armstrong All About The Base Priming Moisturiser',
      price: '£16.00',
      sku: '15075',
    },
    {
      image: 'https://www.shopwithmyrep.co.uk//assets/en-gb/images/product/prod_1195824_1_613x613.jpg',
      url: 'https://www.shopwithmyrep.co.uk/product/6821/coconut-oil-multipurpose-cream-400ml',
      title: 'Coconut Oil Multipurpose Cream',
      price: '£3.00',
      sku: '6821',
    },
  ],
  [
    {
      image: 'https://www.shopwithmyrep.co.uk//assets/en-gb/images/product/prod_1220529_1_613x613.jpg',
      url: 'https://www.shopwithmyrep.co.uk/product/14763/magix-smoothing-spf20-primer',
      title: 'Magix Smoothing SPF20 Primer',
      rrp: '£8.00',
      price: '£6.00',
      sku: '14763',
    },
    {
      image: 'https://www.shopwithmyrep.co.uk//assets/en-gb/images/product/prod_1204047_1_613x613.jpg',
      url: 'https://www.shopwithmyrep.co.uk/product/14659/nutra-effects-matte-oil-control-day-cream-spf20-50ml',
      title: 'Nutra Effects Matte Oil-Control Day Cream SPF20',
      price: '£5.00',
      sku: '14659',
    },
    {
      image: 'https://www.shopwithmyrep.co.uk//assets/en-gb/images/product/prod_1204049_1_613x613.jpg',
      url: 'https://www.shopwithmyrep.co.uk/product/14660/nutra-effects-soothe-hydrating-day-cream-spf20-50ml',
      title: 'Nutra Effects Soothe Hydrating Day Cream SPF20',
      price: '£5.00',
      sku: '14660',
    },
  ]
];

export default () => {
  setup();
  const { rootScope, ID, VARIATION } = shared;

  /** Make all changes - can be re-run on page re-render / App_LayoutChanged */
  const init = () => {
    fireEvent('Conditions Met');

    // -----------------------------
    // Add events that apply to both variant and control
    // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
    // -----------------------------
    // ...

    // -----------------------------
    // If control, bail out from here
    // -----------------------------
    if(VARIATION == 'control') {
      return;
    }

    // -----------------------------
    // Write experiment code here
    // -----------------------------
    const m1 = document.querySelector('#MainContentWrapper');
    m1.innerHTML = `
      <div class="mc">
        <h1>
          <div class="mc-inner">
            Skincare routine builder
          </div>
        </h1>

        <div class="mc-inner">
          <p>Building a skincare routine can be a daunting experience, use this guide to 
            help discover products that suit your skincare needs.</p>
        </div>

        <div class="mc-q mc-q--choices">
          <div class="mc-inner">
            <p>How much time do you have to dedicate to your skincare routine?</p>

            <div class="mc-answers">
              <div class="mc-answer">
                Not much, keep it simple
              </div>

              <div class="mc-answer">
                I want the best, show me all skincare steps
              </div>
            </div>
          </div>
        </div>

        <div class="mc-q mc-q--choices">
          <div class="mc-inner">
            <p>Pick your main skincare concern?</p>

            <div class="mc-answers">
              <div class="mc-answer">
                Sensitive
              </div>

              <div class="mc-answer">
                Combination/Oily
              </div>

              <div class="mc-answer">
                Normal/dry
              </div>

              <div class="mc-answer">
                Aging
              </div>

              <div class="mc-answer">
                Blemish Prone
              </div>

            </div>
          </div>
        </div>

        <div class="mc-q" data-q="1">
          <div class="mc-inner">
            <p>Select your Cleanser</p>

            <div class="mc-answers mc-answers--prods">
            ${[...prods[0]].map(p => {
              return `
                <div class="mc-answer mc-prod">
                  <img src="${p.image}">

                  <p class="mc-prod__title">${p.title}</p>

                  <p class="mc-prod__price">${p.price}</p>

                  <p class="mc-prod__add"><a data-json='${JSON.stringify(p)}' data-sku="${p.sku}"><span>+</span> Add to my routine</a></p>

                </div>
              `;
            })}
            </div>
          </div>
        </div>
        
        <div class="mc-q">
          <div class="mc-inner">
            <p>Select your toner</p>

            <div class="mc-answers mc-answers--prods">
            ${[...prods[1]].map(p => {
              return `
                <div class="mc-answer mc-prod">
                  <img src="${p.image}">

                  <p class="mc-prod__title">${p.title}</p>

                  <p class="mc-prod__price">${p.price}</p>

                  <p class="mc-prod__add"><a data-json='${JSON.stringify(p)}' data-sku="${p.sku}"><span>+</span> Add to my routine</a></p>

                </div>
              `;
            })}
            </div>
          </div>
        </div>

        <div class="mc-q">
          <div class="mc-inner">
            <p>Select your serum</p>

            <div class="mc-answers mc-answers--prods">
            ${[...prods[2]].map(p => {
              return `
                <div class="mc-answer mc-prod">
                  <img src="${p.image}">

                  <p class="mc-prod__title">${p.title}</p>

                  <p class="mc-prod__price">${p.price}</p>

                  <p class="mc-prod__add"><a data-json='${JSON.stringify(p)}' data-sku="${p.sku}"><span>+</span> Add to my routine</a></p>

                </div>
              `;
            })}
            </div>
          </div>
        </div>

        <div class="mc-q">
          <div class="mc-inner">
            <p>Select your eye cream</p>

            <div class="mc-answers mc-answers--prods">
            ${[...prods[3]].map(p => {
              return `
                <div class="mc-answer mc-prod">
                  <img src="${p.image}">

                  <p class="mc-prod__title">${p.title}</p>

                  <p class="mc-prod__price">${p.price}</p>

                  <p class="mc-prod__add"><a data-json='${JSON.stringify(p)}' data-sku="${p.sku}"><span>+</span> Add to my routine</a></p>

                </div>
              `;
            })}
            </div>
          </div>
        </div>

        <div class="mc-q">
          <div class="mc-inner">
            <p>Select your moisturiser</p>

            <div class="mc-answers mc-answers--prods">
            ${[...prods[4]].map(p => {
              return `
                <div class="mc-answer mc-prod">
                  <img src="${p.image}">

                  <p class="mc-prod__title">${p.title}</p>

                  <p class="mc-prod__price">${p.price}</p>

                  <p class="mc-prod__add"><a data-json='${JSON.stringify(p)}' data-sku="${p.sku}"><span>+</span> Add to my routine</a></p>

                </div>
              `;
            })}
            </div>
          </div>
        </div>

        <div class="mc-q">
          <div class="mc-inner">
            <p>Select your SPF</p>

            <div class="mc-answers mc-answers--prods">
            ${[...prods[5]].map(p => {
              return `
                <div class="mc-answer mc-prod">
                  <img src="${p.image}">

                  <p class="mc-prod__title">${p.title}</p>

                  <p class="mc-prod__price">${p.price}</p>

                  <p class="mc-prod__add"><a data-json='${JSON.stringify(p)}' data-sku="${p.sku}"><span>+</span> Add to my routine</a></p>

                </div>
              `;
            })}
            </div>
          </div>
        </div>

        <div class="mc-summary">
          <div class="mc-inner">
            <h2>Routine Summary</h2>
            <div class="mc-summary__items">
            </div>
            <p>
              <div class="Button button-add-to-cart vi-btn vi-btn--primary ng-click-active" ng-show="isAddToBagVisible() &amp;&amp; hasActiveVariantOrConditionalCanAdd()" ng-click="addToCartClick()" ng-class="{'button-add-to-cart-disabled': !hasSelectedVariant()}">
                    <div class="button-add-to-cart-content button-add-to-cart-text text-not-selectable">Add Routine to Bag</div></div>
            </p>
          </div>
        </div>
      </div>
    `;
  
    // Add to routine
    const prodsToAdd = document.querySelectorAll('.mc-prod__add a');
    console.log(prodsToAdd);
    [].forEach.call(prodsToAdd, p => {
      p.addEventListener('click', e => {
        addToRoutine(e.currentTarget);
      });
    });

    // choices
    [].forEach.call(document.querySelectorAll('.mc-q--choices'), (q) => {
      q.addEventListener('click', e => {
        if(e.target.classList.contains('mc-answer')) {
          [].forEach.call(q.querySelectorAll('.mc-answer'), a => {
            a.classList.remove('active');
          });

          e.target.classList.add('active');
        }
      });
    });

    // Summary items
    const items = document.querySelector('.mc-summary__items');
    if(items) {
      // Temp - polling interval to update display
      // replace with state
      setInterval(() => {
        const routine = JSON.parse(localStorage.getItem('routine') || '[]');
        if(routine && routine.length) {
          routine.forEach((r) => {
            if(!items.querySelector(`[sku="${r.sku}"]`)) {
              items.insertAdjacentHTML('beforeend', `
                <div sku="${r.sku}">
                  <img src="${r.image}">
                  <div>
                    <p>${r.title}</p>
                    <p>${r.price}</p>
                  </div>
                </div>
              `);
            }
          });
        }
      }, 500);
    }
  };

  // Make device specific changes when layout changes
  rootScope.$on('App_LayoutChanged', () => {
    setTimeout(init, 500);
  });

  init();
};
