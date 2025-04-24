import offerWrapper from '../components/offerWrapper';
import { addSwiperElement, personalizedOffers } from '../experiment';
import { pollerLite } from '../../../../../../lib/utils';


const offerSectionReRender = (id, offer, text, isFiltered, indicator) => {
  pollerLite(['.oct-decorative-panel__inner__content .oct-grid-aem__cell__width--firstRow div[data-testid="grid"]'], () => {
    document.querySelector(`.${id}__offerWrapper`) && document.querySelector(`.${id}__offerWrapper`).remove();

    const targetElementWrapper = document.querySelector(
      '.oct-decorative-panel__inner__content .oct-grid-aem__cell__width--firstRow div[data-testid="grid"]'
    );
    targetElementWrapper
      .querySelector('div[data-testid="row"]:nth-child(6)')
      ?.insertAdjacentHTML('afterend', offerWrapper(id, offer, isFiltered));

    const title = document.querySelector(`.${id}__offerHeader-text`);
    title.textContent = text;

    addSwiperElement(`.${id}__swiper`);
    document.querySelector(`.${id}__oct-toggle__checkbox`).checked = indicator;
    filterToggleHandler(id);

    // pollerLite([`.${id}__oct-toggle__checkbox`], () => {
    //   document.querySelector(`.${id}__oct-toggle__checkbox`).checked = indicator;
    //   filterToggleHandler(id);
    // });
  });
};

const changeHandler = (event, id, toggleButton) => {
  const offerFilterBtn = document.querySelector(`.${id}__offerFilterBtn`);
  offerFilterBtn.disabled = true;
  console.log('After click - Personalized offerFilterBtn if:', offerFilterBtn);

  if (event.target.checked) {
    //WHILE TOGGLE THEN CALL THIS
    const indicator = true;
    personalizedOffers().then((data) => {
      window[`${id}__personalizedOffers`] = data;
      const offer = window[`${id}__personalizedOffers`];
      offerSectionReRender(id, offer, 'Latest offers', false, indicator);
      toggleButton.checked = true;
      offerFilterBtn.disabled = false;
      console.log('Personalized offerFilterBtn if:', offerFilterBtn);
    });
  } else {
    const indicator = false;
    const offer = window[`${id}__offers`];
    const offerTitle = window.location.pathname.split('/')[1].replace(/-/g, ' & ');
    offerSectionReRender(id, offer, `Latest ${offerTitle} offers`, true, indicator);
    window[`${id}__personalizedOffers`] = null;
    toggleButton.checked = false;
    offerFilterBtn.disabled = false;
    console.log('Personalized offerFilterBtn else:', offerFilterBtn);
  }
};

const filterToggleHandler = (id) => {
  const toggleButton = document.querySelector(`.${id}__oct-toggle__checkbox`);

  toggleButton.removeEventListener('change', (event) => changeHandler(event, id, toggleButton));
  toggleButton.addEventListener('change', (event) => changeHandler(event, id, toggleButton));
};

export default filterToggleHandler;
