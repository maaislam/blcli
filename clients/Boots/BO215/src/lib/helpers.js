import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { pollerLite } from "../../../../../lib/utils";

const { ID, VARIATION } = shared;

// events
const bundleEvents = () => {
  const bundleProduct = document.querySelectorAll(`.inc_pdp_bundle_product_block`);
  if(bundleProduct) {
    for (let index = 0; index < bundleProduct.length; index += 1) {
      const element = bundleProduct[index];
      element.querySelector('a').addEventListener('click', () => {
        fireEvent('Click bundle product');
      });
    }
  }

  const bundleAdd = document.querySelector('.inc_pdp_bundle_cart_summary_add_btn_text');
  if(bundleAdd) {
    bundleAdd.addEventListener('click', () => {
      fireEvent('Click add bundle to basket');
    });
  }
}

const increasinglyProductEvents = () => {
  const incProduct = document.querySelectorAll(`.inc_product_module_block`);
  if(incProduct) {
    for (let index = 0; index < incProduct.length; index += 1) {
      const element = incProduct[index];
      element.querySelector('a').addEventListener('click', () => {
        fireEvent('Click increasingly product');
      });
    }
  }
};

export const rrEvents = () => {
  const rrProduct = document.querySelectorAll(`.rrItemContainer`);
  if(rrProduct) {
    for (let index = 0; index < rrProduct.length; index += 1) {
      const element = rrProduct[index];
      element.querySelector('a').addEventListener('click', () => {
        fireEvent('Click RR product');
      });
    }
  }
}

export const increasinglyScript = () => {
  return new Promise(function(res, ref) {
    var versionUpdate = (new Date()).getTime();
    function loadAssets(incre_fileListToLoad) {
      var script = document.createElement("script")
      script.type = "text/javascript";
      script.src = incre_fileListToLoad[0].url;
      script.async = true;
      document.getElementsByTagName("head")[0].appendChild(script);
    }
    var incre_fileListToLoad = [{
      url: 'https://www.increasingly.co/Implementation/bTSx98/js/increasingly_bTSx98.js?v=' + versionUpdate,
      type: 'js'
    }]
    loadAssets(incre_fileListToLoad);
    res();
  });
}

export const increasinglyCheck = () => {
 

   window.addEventListener('load', () => {

    const checkIncreasingly = () => {
      return new Promise(function(res, reject) {
        if(document.querySelector('.inc_pdp_block') || document.querySelector('.inc_af_block')) {
          res();
        } else {
          reject();
        }
      });
    }

    checkIncreasingly().then(() => {
      pollerLite(['.inc_pdp_block'], () => {
        const increasingly = document.querySelector('.inc_pdp_block');
        document.querySelector('#estore_productpage_template_container').appendChild(increasingly);
        bundleEvents();
      });

      pollerLite(['.inc_af_block.inc_recommendations'], () => {
        const increasingly = document.querySelector('.inc_af_block.inc_recommendations');
        document.querySelector('#estore_productpage_template_container').appendChild(increasingly);
        increasinglyProductEvents();
      });

    }).catch(() => {

        increasinglyScript().then(() => {
          pollerLite(['.inc_pdp_block'], () => {
            const increasingly = document.querySelector('.inc_pdp_block');
            document.querySelector('#estore_productpage_template_container').appendChild(increasingly);
            bundleEvents();
          });

          pollerLite(['.inc_af_block.inc_recommendations'], () => {
            const increasingly = document.querySelector('.inc_af_block.inc_recommendations');
            document.querySelector('#estore_productpage_template_container').appendChild(increasingly);
            increasinglyProductEvents();
          });
        });
    });
   });
}

export const tabbedRichRevelance = () => {
  pollerLite(['#richRelevanceContainer', '.rrPlacements'], () => {

    if(VARIATION === '2') {
      const richRelevance = document.querySelector('#richRelevanceContainer');
      document.querySelector('.row.template_row_spacer').insertAdjacentElement('beforebegin', richRelevance);
    }

    if(VARIATION === '5') {
      const richRelevance = document.querySelector('#richRelevanceContainer');
      document.querySelector('#estore_productpage_template_container').appendChild(richRelevance);
    }
    /**
     * @desc Create carousel tabs
     */

    document.getElementById('item_page.rec1').classList.add('active');
    document.getElementById('item_page.rec1').setAttribute('style', 'display: block !important;');

    const carouselsWrapper = document.querySelector('#richRelevanceContainer');
    const tabsContainer = `<div class="${ID}-tabs__wrapper">
      <ul class="${ID}-tabs__container">
        <li class="${ID}-tab active" data-id="item_page.rec1"><p>Trending</p></li>
        <li class="${ID}-tab" data-id="item_page.rec2"><p>Associated</p></li>
        <li class="${ID}-tab" data-id="item_page.rec3"><p>Popular</p></li>
        <span class="tabs-active-marker"></span>
      </ul>
    </div>`;
    carouselsWrapper.insertAdjacentHTML('beforebegin', tabsContainer);
    

  
    const tabList = document.querySelector(`.${ID}-tabs__wrapper`);
    const tabs = tabList.querySelectorAll(`.${ID}-tab`);

    const resizeTabMarker = () => {
      const activeTabEl = tabList.querySelector(`.${ID}-tab.active`);
      const activeMarker = tabList.querySelector(`.tabs-active-marker`);

      activeMarker.style.width = `${activeTabEl.getBoundingClientRect().width}px`;
      activeMarker.style.transform = `translateX(${
        activeTabEl.getBoundingClientRect().left -
        tabList.getBoundingClientRect().left
      }px)`;

    };

    resizeTabMarker();
  

    const setActiveClass = (evt) => {
      Array.prototype.forEach.call(tabs, function(tab) {
        tab.classList.remove('active');
      });
      
      evt.currentTarget.classList.add('active');

      fireEvent('Clicked tab heading');

      const tabId = evt.currentTarget.getAttribute('data-id');
      const selectedTab = document.getElementById(`${tabId}`);

      document.querySelector('.rrPlacements.active').classList.remove('active');
      selectedTab.classList.add('active');

      if (tabId !== 'item_page.rec1') {
        document.getElementById(`item_page.rec1`).setAttribute('style', 'visibility: hidden;');
      } else {
        document.getElementById(`item_page.rec1`).setAttribute('style', 'visibility: visible;');
      }

      resizeTabMarker();

    }

    Array.prototype.forEach.call(tabs, function(tab) {
      tab.addEventListener('click', setActiveClass);
    });

    new ResizeObserver(() => resizeTabMarker()).observe(tabList);

  });
 
};