import shared from '../../../../../../core-files/shared';
import { pollerLite } from '../../../../../../lib/utils';

const { ID } = shared;
const renderPdpChanges = () => {
  const { pageType, parentCategories, pageData } = window.blDataLayer;
  if (pageType !== 'pdp') {
    return;
  }
  pollerLite(['[data-qaid="pdp-product-overview"]'], () => {
    if (document.querySelector(`.${ID}__compare-button`)) return;
    const category = parentCategories.at(-2);
    const attatchPoint = document.querySelector('[data-qaid="pdp-product-overview"]');
    const secondToLastPlp = document.querySelector(`a[title*="${category}"]`);
    const secondToLastPlpUrl = secondToLastPlp.getAttribute('href');
    const comparePageUrl = `${secondToLastPlpUrl}?action=compare`;
    const compareButton = document.createElement('div');
    compareButton.classList.add(`${ID}__compare-button`);
    compareButton.setAttribute('data-skuId', pageData.skuId);
    compareButton.setAttribute('data-href', `${comparePageUrl}`);
    compareButton.innerHTML = `<span>Compare our ${category} product range</span>`;
    attatchPoint.insertAdjacentElement('beforebegin', compareButton);
  });
};

export default renderPdpChanges;
