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

        <a class="${shared.ID}__makeup-bag__link" href="/collections/foundation">
          <div class="${shared.ID}__makeup-bag__link__img">
            <img src="https://service.maxymiser.net/cm/images-eu/avon-mas/E2EC482D0C1B6861F537A18DE2864C758180BCB8792B8295AAF73A546BD394F6.png?meta=/AV077---Health-Routine-Homepage-Element---Shopify/foundation.png"/>
          </div>
          <div class="${shared.ID}__makeup-bag__link__cta">
            Foundation
          </div>
        </a>

        <a class="${shared.ID}__makeup-bag__link" href="/collections/eyeliner">
          <div class="${shared.ID}__makeup-bag__link__img">
            <img src="https://service.maxymiser.net/cm/images-eu/avon-mas/C46E6412B37C43A1A0E42CFBB54003C27EC6868D15D725885B7179521D816E97.png?meta=/AV077---Health-Routine-Homepage-Element---Shopify/eyeliner.png"/>
          </div>
          <div class="${shared.ID}__makeup-bag__link__cta">
            Eyeliner
          </div>
        </a>

        <a class="${shared.ID}__makeup-bag__link" href="/collections/blusher">
          <div class="${shared.ID}__makeup-bag__link__img">
            <img src="https://service.maxymiser.net/cm/images-eu/avon-mas/C5EFD197EF763C159C0EB8CCC74DD4349F816416495D9F8D24CF7EE59F5A3B75.png?meta=/AV077---Health-Routine-Homepage-Element---Shopify/blusher.png"/>
          </div>
          <div class="${shared.ID}__makeup-bag__link__cta">
            Blusher
          </div>
        </a>

        <a class="${shared.ID}__makeup-bag__link" href="/collections/eyes/eyeshadow">
          <div class="${shared.ID}__makeup-bag__link__img">
            <img src="https://service.maxymiser.net/cm/images-eu/avon-mas/9C72C3B713104EB2530F68B94E8DB944D7C6519822C7A2E242C9E1B7805746D9.png?meta=/AV077---Health-Routine-Homepage-Element---Shopify/eyeshadow.png"/>
          </div>
          <div class="${shared.ID}__makeup-bag__link__cta">
            Eyeshadow
          </div>
        </a>

        <a class="${shared.ID}__makeup-bag__link" href="/collections/concealer">
          <div class="${shared.ID}__makeup-bag__link__img">
            <img src="https://service.maxymiser.net/cm/images-eu/avon-mas/6B9F32144EC442186E227C09AEDD72B9840A255D5F097A2140E4EA51D47AB498.png?meta=/AV077---Health-Routine-Homepage-Element---Shopify/concealer.png"/>
          </div>
          <div class="${shared.ID}__makeup-bag__link__cta">
            Concealer
          </div> 
        </a>

        <a class="${shared.ID}__makeup-bag__link" href="/collections/mascara">
          <div class="${shared.ID}__makeup-bag__link__img">
            <img src="https://service.maxymiser.net/cm/images-eu/avon-mas/36B0804D9A400434722C5883E91E342FC726EC801665AE2C57A589AD0115C6A5.png?meta=/AV077---Health-Routine-Homepage-Element---Shopify/mascara.png"/>
          </div>
          <div class="${shared.ID}__makeup-bag__link__cta">
            Mascara
          </div>
        </a>

        <a class="${shared.ID}__makeup-bag__link" href="/collections/highlighter">
          <div class="${shared.ID}__makeup-bag__link__img">
            <img src="https://service.maxymiser.net/cm/images-eu/avon-mas/20DEBC3762282FC51A89C72962EE87BD58626933CAEB6DBECF77753B687CB022.png?meta=/AV077---Health-Routine-Homepage-Element---Shopify/highlighter.png"/>
          </div>
          <div class="${shared.ID}__makeup-bag__link__cta">
            Highlighter
          </div>
        </a>

        <a class="${shared.ID}__makeup-bag__link" href="/collections/lips">
          <div class="${shared.ID}__makeup-bag__link__img">
            <img src="https://service.maxymiser.net/cm/images-eu/avon-mas/B99903D54F164A7D0FB296FAAE8B5827C8BA231D4C4F8E1620F5DDB6295819F8.png?meta=/AV077---Health-Routine-Homepage-Element---Shopify/lipstick.png"/>
          </div>
          <div class="${shared.ID}__makeup-bag__link__cta">
            Lipstick
          </div>
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
          <img onclick="location.href='https://avon.uk.com/products/anew-lifting-dual-eye-system';" class="${shared.ID}__img" src="https://service.maxymiser.net/cm/images-eu/avon-mas/5C65DD0200018EBE0182570FD69B866F852C2F4103363641EA7D4793872624AA.jpeg?meta=/AV077---Health-Routine-Homepage-Element---Shopify/anew.jpeg"/>

          <div onclick="location.href='https://avon.uk.com/products/anew-lifting-dual-eye-system';" class="${shared.ID}__essentials__item__title">
            Anew Anti Ageing Eye Cream - 20ml
          </div>

          <div class="${shared.ID}__essentials__item__price">
            £12.00
          </div>
          
          <a data-sku="34964825604141" class="${shared.ID}__essentials__item__cta">
            Add to bag
          </a>
          
        </div>


        <div class="${shared.ID}__essentials__item">
          <img onclick="location.href='https://avon.uk.com/products/skin-so-soft-original-dry-oil-spray';" class="${shared.ID}__img" src="https://service.maxymiser.net/cm/images-eu/avon-mas/702218465CB2C615DC60CADF12E96171F43D7E3FBC4F35FC216CF952F0433362.png?meta=/AV077---Health-Routine-Homepage-Element---Shopify/image4.png"/>

          <div onclick="location.href='https://avon.uk.com/products/skin-so-soft-original-dry-oil-spray';" class="${shared.ID}__essentials__item__title">
            Skin So Soft Original Dry Oil - 150ml
          </div>

          <div class="${shared.ID}__essentials__item__price">
            £3.50
          </div>
          
          <a data-sku="35062152200237" class="${shared.ID}__essentials__item__cta">
            Add to bag
          </a>
        </div>

        <div class="${shared.ID}__essentials__item">
          <img onclick="location.href='https://avon.uk.com/products/avon-care-travel-size-moisturising-hand-gel';" class="${shared.ID}__img" src="https://service.maxymiser.net/cm/images-eu/avon-mas/698C261D131C20A846CE7D4BD9E80ABD609F3632343F66977C5CD85E053C73E0.png?meta=/AV077---Health-Routine-Homepage-Element---Shopify/image5.png"/>

          <div onclick="location.href='https://avon.uk.com/products/avon-care-travel-size-moisturising-hand-gel';" class="${shared.ID}__essentials__item__title">
            Moisturising Hand Gel - 100ml
          </div>

          <div class="${shared.ID}__essentials__item__price">
            £1.50
          </div>
          
          <a data-sku="35062149808173" class="${shared.ID}__essentials__item__cta">
            Add to bag
          </a>
        </div>

        <div class="${shared.ID}__essentials__item">
          <img onclick="location.href='https://avon.uk.com/products/planet-spa-aromatherapy-beauty-sleep-pillow-mist';" class="${shared.ID}__img" src="https://service.maxymiser.net/cm/images-eu/avon-mas/E2208350241FDF2884A648C83ACEC6D34CBF0D8C3F62DB4C18B53D739BE7E6D1.png?meta=/AV077---Health-Routine-Homepage-Element---Shopify/image6.png"/>

          <div onclick="location.href='https://avon.uk.com/products/planet-spa-aromatherapy-beauty-sleep-pillow-mist';" class="${shared.ID}__essentials__item__title">
            Aromatherapy Beauty Sleep Pillow Mist
          </div>

          <div class="${shared.ID}__essentials__item__price">
            £4.00
          </div>
          
          <a data-sku="35062159769645" class="${shared.ID}__essentials__item__cta">
            Add to bag
          </a>
        </div>



        <div class="${shared.ID}__essentials__item">
          <img onclick="location.href='https://avon.uk.com/products/white-lily-bubble-bath';" class="${shared.ID}__img" src="https://service.maxymiser.net/cm/images-eu/avon-mas/254282123FAF7B567D46D2D18D5FDA886718FCDA37F62FB2D3D9570E83358E84.png?meta=/AV077---Health-Routine-Homepage-Element---Shopify/image7.png"/>

          <div onclick="location.href='https://avon.uk.com/products/white-lily-bubble-bath';" class="${shared.ID}__essentials__item__title">
            White Lily Bubble Bath - 1 litre
          </div>

          <div class="${shared.ID}__essentials__item__price">
            £2.25
          </div>
          
          <a data-sku="35062174285869" class="${shared.ID}__essentials__item__cta">
            Add to bag
          </a>
        </div>

        <div class="${shared.ID}__essentials__item">
          <img onclick="location.href='https://avon.uk.com/products/anew-anti-wrinkle-smoothing-serum';" class="${shared.ID}__img" src="https://service.maxymiser.net/cm/images-eu/avon-mas/7C340BA0233F51EDCEF8534837ECCAB5E75E5A3F32209460EB07D839D5B49EE5.jpeg?meta=/AV077---Health-Routine-Homepage-Element---Shopify/serum.jpeg"/>

          <div onclick="location.href='https://avon.uk.com/products/anew-anti-wrinkle-smoothing-serum';" class="${shared.ID}__essentials__item__title">
            Anew Clinical Anti-Wrinkle Smoothing Serum
          </div>

          <div class="${shared.ID}__essentials__item__price">
            £16.00
          </div>
          
          <a data-sku="35062159999021" class="${shared.ID}__essentials__item__cta">
            Add to bag
          </a>
        </div>

      </div>
    </div>
  `;

  if(mainHero) {
    mainHero.insertAdjacentHTML('beforeend', markup);

    const ctas = document.querySelectorAll(`.${shared.ID}__essentials__item__cta`);
    if (ctas) {
      [].forEach.call(ctas, (cta) => {
        cta.addEventListener( 'click', () => {
          cta.innerText = 'Adding';
          let productSku = cta.getAttribute('data-sku');
          jQuery.ajax({
            url: `https://avon.uk.com/cart/add?id=${productSku}`,
            success: function(xhr) {
              cta.innerText = 'Added';
              events.send(`${shared.ID}`, `${productSku}-add-to-bag`);
              setTimeout( () => {
                cta.innerText = 'Add to bag';
              }, 2000);
              const cartCount = document.querySelector('.cart-count');
              var cartAmount = parseInt(cartCount.innerText) + 1;
              cartCount.innerText = cartAmount;
            }
          });
          // window.AppModule.RootScope.AddToCart(productSku, 1, window.AppModule.RootScope.ShopContext.CampaignNumber);
          // window.scrollTo({ top: 0, behavior: 'smooth' });

          // if (productSku == '5072-52213') {
          //   productSku = 'skin-so-soft-150ml';
          //   events.send(`${shared.ID}--add-to-bag`, productSku);
          // };
          // if (productSku == '14163-212398415211') {
          //   productSku = 'moisturising-hand-gel-100ml';
          //   events.send(`${shared.ID}--add-to-bag`, productSku);
          // };
          // if (productSku == '16421-212398420774') {
          //   productSku = 'anew-lifting-dual-20ml';
          //   events.send(`${shared.ID}--add-to-bag`, productSku);
          // };
          // if (productSku == '1998-65') {
          //   productSku = 'aromatherapy-pillow-spray-100ml';
          //   events.send(`${shared.ID}--add-to-bag`, productSku);
          // };
          // if (productSku == '1789-141467499609') {
          //   productSku = 'white-lily-bubble-bath-1l';
          //   events.send(`${shared.ID}--add-to-bag`, productSku);
          // };
          // if (productSku == '16419-212398420772') {
          //   productSku = 'anew-anti-wrinkle-serum-30ml';
          //   events.send(`${shared.ID}--add-to-bag`, productSku);
          // };
          
        })
      })
    }

    const items = document.querySelectorAll(`.${shared.ID}__essentials__item`);
    if (items) {
      [].forEach.call(items, item => {
        const title = item.querySelector(`.${shared.ID}__essentials__item__title`);
        const img = item.querySelector(`.${shared.ID}__essentials__item__img`);
        if (img) {
          img.addEventListener('click', () => {
            events.send(`${shared.ID}--img-click`, title.innerText);
          })
        };
        if (title) {
          title.addEventListener('click', () => {
            events.send(`${shared.ID}--title-click`, title.innerText);
          })
        }
      })
    }

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
    var isClassAdded = false;
    if (!isClassAdded) {
      if(shared.VARIATION === "1") {
        runV1Changes();
        isClassAdded = true;
      }
       else if(shared.VARIATION === "2") {
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
