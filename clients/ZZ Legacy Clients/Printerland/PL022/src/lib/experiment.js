import {
  setup
} from './services';
import {
  pollerLite,
  observer
} from '../../../../../lib/uc-lib';
import {
  setFakeCompareButtons,
} from '../lib/services';
import changeCompareProductsElements from './changeCompareProductsElements';
import settings from './settings';
const {
  ID
} = settings;
const activate = () => {
  setup();
  const productNameEl = document.querySelector('h1#productTitle');
  let productName = null;
  if (productNameEl) {
    productName = productNameEl.innerText.trim();
  }
  /*if(document.body.classList.contains('page-home')){
  }
  if(document.body.classList.contains('page-printer-list')){
  }
  //Set fake compare buttons
  // Get the header
  var header = document.querySelector('.compare-table .py-1.h6');
  // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
  function addStickyness() {
    if (window.pageYOffset > 200) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  }
  // When the user scrolls the page, execute myFunction 
  window.onscroll = function () {
    addStickyness()
  };*/
  setFakeCompareButtons();
  observer.connect(document.querySelector('.compare-table'), () => {
    setFakeCompareButtons();
  }, {
    config: {
      attributes: true,
      childList: true,
      nodeTree: true,
    },
    throttle: 500
  });
  //Re-run both functions if page attributes change
  // Run Script when Compare Tool is Closed (inactive)
  observer.connect(document.querySelector('#ctl00_ctl00_body'), () => {
    if (!document.querySelector('#ctl00_ctl00_lnkCompare').classList.contains('active')) {
      changeCompareProductsElements(productName);
      setFakeCompareButtons();
    }
    
  }, {
    config: {
      attributes: true,
      childList: false,
      nodeTree: false,
    },
    throttle: 500
  });
  // Run Script when Compare Tool is Open (active)
  observer.connect(document.querySelector('#ctl00_ctl00_pnlUpdatestaticWrapper'), () => {
    if (document.querySelector('#ctl00_ctl00_lnkCompare').classList.contains('active')) {
      changeCompareProductsElements(productName);
      // setFakeCompareButtons();
    }
  }, {
    config: {
      attributes: false,
      childList: true,
      nodeTree: false,
    },
    throttle: 500
  });
};

export default activate;
