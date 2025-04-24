//import { setup, fireEvent } from '../../../../../../globalUtil/trackings/services';
import { setup, fireEvent } from '../../../../../core-files/services';
import slideCatalog from './components/slideCatalog';
//import getCatalog from './helpers/getCatalog';
import observeDOM from './helpers/observeDOM';
import shared from './shared/shared';

const { ID, VARIATION } = shared;
setup();
const init = (catalogBtnData) => {
  //remove existing
  document.querySelectorAll(`.${ID}__slidecatalog`).forEach((item) => {
    item?.remove();
  });
  if (location.hash !== '#page/1') return;

  console.log(catalogBtnData);
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  const getComputedStyle = (element) => window.getComputedStyle(element, null);

  const anchorElem = document.querySelector('[data-item-id="nextButGroup"]');
  const anchorElemCss = getComputedStyle(anchorElem);
  const anchorElemPos = {
    top: anchorElemCss.getPropertyValue('top'),
    left: anchorElemCss.getPropertyValue('left'),
  };
  console.log(anchorElemPos);
  anchorElem.classList.add(`${ID}__anchorelem`);
  const sideBannerAlreadyClosed = sessionStorage.getItem(`${ID}__sidebannerclosed`) == 'true';
  if (sideBannerAlreadyClosed) return;
  anchorElem.insertAdjacentHTML('beforebegin', slideCatalog(ID, catalogBtnData, anchorElemPos));
  document.querySelector(`.${ID}__slidecatalog`).addEventListener('click', (e) => {
    const target = e.target;
    if (target.matches(`.${ID}__closeicon > svg`) || target.closest(`.${ID}__closeicon > svg`)) {
      document.querySelector(`.${ID}__slidecatalog`).remove();
      sessionStorage.setItem(`${ID}__sidebannerclosed`, 'true');
    } else if (target.matches(`.${ID}__slidecatalog--content`) || target.closest(`.${ID}__slidecatalog--content`)) {
      fireEvent('Conditions Met');
    }
  });
};

export default () => {
  if (VARIATION == 'control' && location.href.indexOf('https://za.avon-brochure.com/avon/mrsalbee/') !== -1) {
    fireEvent('Conditions Met');
    return;
  }
  //setup(); //use if needed
  //const catalogs = await getCatalog();
  //const saleCatalog = catalogs.filter((catalog) => catalog.infos.publication.title.toLowerCase() !== 'end of season sale')[0];

  const catalogBtnData =
    VARIATION == '1'
      ? {
          live_url: 'https://za.avon-brochure.com/avon/mrsalbee/c06_za_2022/end-of-season-sale/#plp',
          small_cover: 'https://cdn-eu.dynamicyield.com/api/9878002/images/319cbb951b611__group_29.png',
          infos: { publication: { title: 'Clearance Sale' } },
        }
      : null;

  setTimeout(() => {
    init(catalogBtnData);
  }, 500);

  init(catalogBtnData);
  const mutationCallback = (mutation, urlChanged) => {
    if (urlChanged) {
      setTimeout(() => {
        init(catalogBtnData);
      }, 500);
    }
  };
  observeDOM('body', mutationCallback);
};
