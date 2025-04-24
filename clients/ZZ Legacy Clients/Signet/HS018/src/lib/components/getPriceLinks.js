import settings from '../settings';

/* V1 Add the filters as new elements to the PLP page */
export default () => {

  const addFilters = () => {
    const allPriceFilters = document.querySelectorAll('#refinement-price .styled-checkbox.filters-panel__refinement-selector .filters-panel__refinement-link');

    for (let index = 0; index < allPriceFilters.length; index += 1) {
      const element = allPriceFilters[index];
      const filterText = element.textContent.trim().match(/^[^\(]+/)[0];
      const filterLink = element.getAttribute('href');
      const newPriceFilter = document.createElement('div');
      newPriceFilter.classList.add(`${settings.ID}-priceLink`);
      newPriceFilter.innerHTML = `<a href="${filterLink}">${filterText}</a>`;

      document.querySelector(`.${settings.ID}-priceLinks`).appendChild(newPriceFilter);
    }
  };
  addFilters();

  // put the filters in a slider
  const initSlider = () => {
    jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', (data, textStatus, jqxhr) => {
      jQuery(`.${settings.ID}-priceLinks`).slick({
        variableWidth: true,
        slidesToShow: 3,
        infinite: false,
        slidesToScroll: 1,
      });
    });
  };
  initSlider();
};
