/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { pollerLite } from "../../../../../lib/uc-lib";
import { events, setCookie, getCookie } from "../../../../../lib/utils";
import { loadProductData } from "../../../../../lib/utils/avon";

const runChanges = () => {
  
  const mainHero = document.querySelector('.site-usp');
  

  const markup = `
    <div class="${shared.ID}__container container-fluid">
      <h3 class="${shared.ID}__makeup-bag__title">YOUR MAKE-UP BAG</h3>
      <div class="${shared.ID}__makeup-bag">

        <a class="${shared.ID}__makeup-bag__link" href="/301-317-422/make-up/face/foundation">
          <img src="https://service.maxymiser.net/cm/images-eu/avon-mas/A4F7151839A14A45A6D2DC7370A866F67D77CBDCA515DCAB6C98F13A76171DD2.png?meta=/AV067---Health-Routine-Homepage-Element/foundation.png" />
        </a>

        <a class="${shared.ID}__makeup-bag__link" href="/301-316-420/make-up/eyes/eyeliner">
          <img src="https://service.maxymiser.net/cm/images-eu/avon-mas/52946B7644C2615EE4CE60D5DD6207543F8980FA57782150E84B9971FE239A95.png?meta=/AV067---Health-Routine-Homepage-Element/eyeliner.png" />
        </a>

        <a class="${shared.ID}__makeup-bag__link" href="/301-317-425/make-up/face/blusher">
          <img src="https://service.maxymiser.net/cm/images-eu/avon-mas/54FA51CACF534FCC372104A5607BF5285BED177CAA2C0B5405969CDD3CA4B253.png?meta=/AV067---Health-Routine-Homepage-Element/blusher.png" />
        </a>

        <a class="${shared.ID}__makeup-bag__link" href="/301-316-419/make-up/eyes/eyeshadow">
          <img src="https://service.maxymiser.net/cm/images-eu/avon-mas/675EA9D34BB1EDA2271B086A2F6BD7BFB437D5D2DC3A6EF650CB67E9D0669097.png?meta=/AV067---Health-Routine-Homepage-Element/eye-shadow.png" />
        </a>

        <a class="${shared.ID}__makeup-bag__link" href="/301-317-423/make-up/face/concealer">
          <img src="https://service.maxymiser.net/cm/images-eu/avon-mas/C9D308AE0FE8E4674AB10C6B82EC250AD6947000E873B32BD0DEDF8D22A7F0E9.png?meta=/AV067---Health-Routine-Homepage-Element/concealer.png" />
        </a>

        <a class="${shared.ID}__makeup-bag__link" href="/301-316-418/make-up/eyes/mascara">
          <img src="https://service.maxymiser.net/cm/images-eu/avon-mas/9456B11794DF19EEC3C3961BF50FC35787B6203AC46F723AAB94CD546F7A2B38.png?meta=/AV067---Health-Routine-Homepage-Element/mascara.png" />
        </a>

        <a class="${shared.ID}__makeup-bag__link" href="/301-317-426/make-up/face/highlighter">
          <img src="https://service.maxymiser.net/cm/images-eu/avon-mas/83A33AD4A812A86D37DBF302DDC0B6BDF0C618C1D9E9BF65D500948635DC63BE.png?meta=/AV067---Health-Routine-Homepage-Element/highlighter.png" />
        </a>

        <a class="${shared.ID}__makeup-bag__link" href="/301-315/make-up/lips">
          <img src="https://service.maxymiser.net/cm/images-eu/avon-mas/56D0ADAB3903E29CD9F1D65EB15FE45A6070653B3532233C595CA6BF12489F91.png?meta=/AV067---Health-Routine-Homepage-Element/lipstick.png" />
        </a>

      </div>
    </div>
  `;
  if (mainHero) {
    mainHero.insertAdjacentHTML('beforeend', markup);
    const categoryLinks = document.querySelectorAll(`.${shared.ID}__makeup-bag__link`);
    if (categoryLinks) {
      [].forEach.call(categoryLinks, (link) => {
        link.addEventListener('click', () => {
          const url = link.getAttribute('href');
          events.send(`${shared.ID}--category-click`, url);
        })
      })
    }
  }
}

const runV1Changes = () => {
  const mainHero = document.querySelector('.site-usp');

  const markup = `
    <div class="${shared.ID}__container container-fluid">
      <h3 class="${shared.ID}__makeup-bag__title">YOUR ESSENTIALS</h3>
      <div class="${shared.ID}__essentials">

        <div class="${shared.ID}__essentials__item">

          <a data-sku="5072-52213" class="${shared.ID}__essentials__item__link" href="/product/5072/skin-so-soft-original-dry-oil-spray-150ml">
            <img class="${shared.ID}__essentials__item__img" src="https://service.maxymiser.net/cm/images-eu/avon-mas/53ED2B9101BD68C9023DAB34BABFEBFFB3759C550497DB16D9D6F945033A6F7D.png?meta=/AV067---Health-Routine-Homepage-Element/skin-so-soft.png" />

            <div class="${shared.ID}__essentials__item__title">
              SKIN SO SOFT ORIGINAL DRY OIL SPRAY - 150ML
            </div>
          </a>

          <div class="${shared.ID}__essentials__item__price">
            £3.50
          </div>

          <div data-sku="5072-52213" class="${shared.ID}__essentials__item__cta">
            ADD TO BAG
          </div>

        </div>

        <div class="${shared.ID}__essentials__item">

          <a data-sku="14163-212398415211" class="${shared.ID}__essentials__item__link" href="/product/14163/moisturising-hand-gel-100ml">
            <img class="${shared.ID}__essentials__item__img" src="https://service.maxymiser.net/cm/images-eu/avon-mas/7A10CCA93667AD2A1131BDDD4211D7D8DD9EA75A54306CDF496FC84A096A8A63.png?meta=/AV067---Health-Routine-Homepage-Element/moisturising-hand-gel.png" />

            <div class="${shared.ID}__essentials__item__title">
              MOISTURISING HAND GEL - 100ML
            </div>
          </a>

          <div class="${shared.ID}__essentials__item__price">
            £2.00
          </div>

          <div data-sku="14163-212398415211" class="${shared.ID}__essentials__item__cta">
            ADD TO BAG
          </div>

        </div>

        <div class="${shared.ID}__essentials__item">

          <a data-sku="16421-212398420774" class="${shared.ID}__essentials__item__link" href="/product/16421/anew-lifting-dual-eye-system-20ml">
            <img class="${shared.ID}__essentials__item__img" src="https://service.maxymiser.net/cm/images-eu/avon-mas/DE4E9451E144C3F0C4A5D0E43711442DE1485AA8B62B78C95BA565F5754FA300.png?meta=/AV067---Health-Routine-Homepage-Element/new-anew.png" />

            <div class="${shared.ID}__essentials__item__title">
              ANEW LIFTING DUAL EYE SYSTEM - 20ML
            </div>
          </a>

          <div class="${shared.ID}__essentials__item__price">
            £10.00
          </div>

          <div data-sku="16421-212398420774" class="${shared.ID}__essentials__item__cta">
            ADD TO BAG
          </div>

        </div>

        <div class="${shared.ID}__essentials__item">

          <a data-sku="1998-65" class="${shared.ID}__essentials__item__link" href="/product/1998/aromatherapy-beauty-sleep-pillow-mist-spray-lavender-chamomile-100ml">
            <img class="${shared.ID}__essentials__item__img" src="https://service.maxymiser.net/cm/images-eu/avon-mas/EADC20B30A7D74AC3FABF1B9EDB2479E802224A0DAEA7CE40372C1821EDB631C.png?meta=/AV067---Health-Routine-Homepage-Element/pillow-mist.png" />

            <div class="${shared.ID}__essentials__item__title">
              AROMATHERAPY BEAUTY SLEEP PILLOW MIST SPRAY...
            </div>
          </a>

          <div class="${shared.ID}__essentials__item__price">
            £4.00
          </div>

          <div data-sku="1998-65" class="${shared.ID}__essentials__item__cta">
            ADD TO BAG
          </div>

        </div>

        <div class="${shared.ID}__essentials__item">

          <a data-sku="1789-141467499609" class="${shared.ID}__essentials__item__link" href="/product/1789/white-lily-bubble-bath-1-litre">
            <img class="${shared.ID}__essentials__item__img" src="https://service.maxymiser.net/cm/images-eu/avon-mas/BCAFFB1AB5FC5EFD9DF82E6A54D86C9FE7FB939D660FF38923C2E0E99F832A77.png?meta=/AV067---Health-Routine-Homepage-Element/bubble-bath.png" />

            <div class="${shared.ID}__essentials__item__title">
              WHITE LILY BUBBLE BATH - 1 LITRE
            </div>
          </a>

          <div class="${shared.ID}__essentials__item__price">
            £2.50
          </div>

          <div data-sku="1789-141467499609" class="${shared.ID}__essentials__item__cta">
            ADD TO BAG
          </div>

        </div>

        <div class="${shared.ID}__essentials__item">

          <a data-sku="16419-212398420772" class="${shared.ID}__essentials__item__link" href="/product/16419/anew-anti-wrinkle-smoothing-serum-30ml">
            <img class="${shared.ID}__essentials__item__img" src="https://service.maxymiser.net/cm/images-eu/avon-mas/9C680940BBB940CF936FDC7992050A97A2BF27886D7B5BA938D175E1C4F65DBF.png?meta=/AV067---Health-Routine-Homepage-Element/smoothing-serum.png" />

            <div class="${shared.ID}__essentials__item__title">
              ANEW CLINICAL ANTI-WRINKLE SMOOTHING SERUM
            </div>
          </a>

          <div class="${shared.ID}__essentials__item__price">
            £25.00
          </div>

          <div data-sku="16419-212398420772" class="${shared.ID}__essentials__item__cta">
            ADD TO BAG
          </div>
          
        </div>

      </div>
    </div>
  `;

  if(mainHero) {
    mainHero.insertAdjacentHTML('beforeend', markup);

    // const ctas = document.querySelectorAll(`.${shared.ID}__essentials__item__cta`);
    // if (ctas) {
    //   [].forEach.call(ctas, (cta) => {
    //     cta.addEventListener( 'click', () => {
    //       let productSku = cta.getAttribute('data-sku');
    //       window.AppModule.RootScope.AddToCart(productSku, 1, window.AppModule.RootScope.ShopContext.CampaignNumber);
    //       window.scrollTo({ top: 0, behavior: 'smooth' });

    //       if (productSku == '5072-52213') {
    //         productSku = 'skin-so-soft-150ml';
    //         events.send(`${shared.ID}--add-to-bag`, productSku);
    //       };
    //       if (productSku == '14163-212398415211') {
    //         productSku = 'moisturising-hand-gel-100ml';
    //         events.send(`${shared.ID}--add-to-bag`, productSku);
    //       };
    //       if (productSku == '16421-212398420774') {
    //         productSku = 'anew-lifting-dual-20ml';
    //         events.send(`${shared.ID}--add-to-bag`, productSku);
    //       };
    //       if (productSku == '1998-65') {
    //         productSku = 'aromatherapy-pillow-spray-100ml';
    //         events.send(`${shared.ID}--add-to-bag`, productSku);
    //       };
    //       if (productSku == '1789-141467499609') {
    //         productSku = 'white-lily-bubble-bath-1l';
    //         events.send(`${shared.ID}--add-to-bag`, productSku);
    //       };
    //       if (productSku == '16419-212398420772') {
    //         productSku = 'anew-anti-wrinkle-serum-30ml';
    //         events.send(`${shared.ID}--add-to-bag`, productSku);
    //       };
          
    //     })
    //   })
    // }

    // const links = document.querySelectorAll(`.${shared.ID}__essentials__item__link`);
    // if (links) {
    //   [].forEach.call(links, (link) => {
    //     link.addEventListener('click', () => {
    //       let linkSku = link.getAttribute('data-sku');
    //       if (linkSku == '5072-52213') {
    //         linkSku = 'skin-so-soft-150ml';
    //         events.send(`${shared.ID}--item-clicked`, linkSku);
    //       };
    //       if (linkSku == '14163-212398415211') {
    //         linkSku = 'moisturising-hand-gel-100ml';
    //         events.send(`${shared.ID}--item-clicked`, linkSku);
    //       };
    //       if (linkSku == '16421-212398420774') {
    //         linkSku = 'anew-lifting-dual-20ml';
    //         events.send(`${shared.ID}--item-clicked`, linkSku);
    //       };
    //       if (linkSku == '1998-65') {
    //         linkSku = 'aromatherapy-pillow-spray-100ml';
    //         events.send(`${shared.ID}--item-clicked`, linkSku);
    //       };
    //       if (linkSku == '1789-141467499609') {
    //         linkSku = 'white-lily-bubble-bath-1l';
    //         events.send(`${shared.ID}--item-clicked`, linkSku);
    //       };
    //       if (linkSku == '16419-212398420772') {
    //         linkSku = 'anew-anti-wrinkle-serum-30ml';
    //         events.send(`${shared.ID}--item-clicked`, linkSku);
    //       };
    //     })
    //   })
    // }
  }

}

export default () => {
  setup();

  /** Make all changes - can be re-run on page re-render / App_LayoutChanged */
  const init = () => {
    console.log('running init');
    var isClassAdded = false;
    if (!isClassAdded) {
      if(shared.VARIATION === "1") {
        runV1Changes();
        isClassAdded = true;
      }
      if(shared.VARIATION === "2") {
        runChanges();
        isClassAdded = true;
      }
    }
  };

  // Make device specific changes when layout changes
  // rootScope.$on('App_LayoutChanged', () => {
  //   setTimeout(init, 500);
  // });

  init();
};
