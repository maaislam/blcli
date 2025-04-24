import { fireEvent } from '../../../../../../core-files/services';
import shared from '../../../../../../core-files/shared';
const { ID } = shared;

export const clickHandler = (e, init) => {
  const defaultCTAs = ['.js-pf-compare-cta', '.js-cta-buy', '.pd-wishlist-cta', '.product-card-v2__image-link'];
  const target = e.target;
  // console.log(target);

  const targetMatched = (desiredMatch) => target.matches(desiredMatch) || target.closest(desiredMatch);
  const sendClick = (card, index) => card.querySelector(defaultCTAs[index])?.click();

  const closestCard = target.closest('.product-card-v2__item');

  // if (!closestCard) return;
  if (targetMatched(`a.badge-energy-label__badge`) || targetMatched(`.${ID}__energy-icon`)) {
    fireEvent('Customer clicks energy rating');
  } else if (targetMatched(`.js-cta-addon`) || targetMatched(`.js-buy-now`)) {
    fireEvent('Customer clicks add to bag');
  } else if (targetMatched(`.${ID}__compare`)) {
    sendClick(closestCard, 0);
    fireEvent('Customer clicks Compare');
  } else if (targetMatched(`.${ID}__location`)) {
    sendClick(closestCard, 1);
    fireEvent('Customer clicks Where to shop');
  } else if (targetMatched(`.${ID}__wishlist`)) {
    sendClick(closestCard, 2);
    fireEvent('Customer clicks Add to wishlist');
  } else if (targetMatched(`.${ID}__viewDetails`)) {
    sendClick(closestCard, 3);
    fireEvent('Customer clicks View Product');
  } else if (targetMatched(`.${ID}__moreOptions-btn`)) {
    //console.log('worked1');
    closestCard.querySelector(`.${ID}__moreOptions-dropdown`)?.classList.remove(`${ID}__hide`);
    closestCard.classList.add(`${ID}__overlay`);
    fireEvent('Customer clicks More Options');
  } else if (
    (!targetMatched(`.${ID}__moreOptions-dropdown`) && targetMatched(`.${ID}__overlay`)) ||
    targetMatched(`.${ID}__close-btn`)
  ) {
    closestCard.querySelector(`.${ID}__moreOptions-dropdown`)?.classList.add(`${ID}__hide`);
    closestCard.classList.remove(`${ID}__overlay`);
  } else if (targetMatched(`.option-selector-v2`)) {
    setTimeout(() => {
      init();
    }, 2000);
  }
};

export const controlClicks = (e) => {
  const target = e.target;

  const targetMatched = (desiredMatch) => target.matches(desiredMatch) || target.closest(desiredMatch);

  if (targetMatched(`a.badge-energy-label__badge`) || targetMatched(`a.badge.s-first-level`)) {
    fireEvent('Customer clicks energy rating');
  } else if (targetMatched(`.js-cta-addon`) || targetMatched(`.js-buy-now`)) {
    fireEvent('Customer clicks add to bag');
  } else if (targetMatched('.pd-wishlist-cta')) {
    fireEvent('Customer clicks wishlist');
  } else if (targetMatched('.js-cta-buy')) {
    fireEvent('Customer clicks Where to shop');
  } else if (targetMatched('.js-pf-compare-cta')) {
    fireEvent('Customer clicks Compare');
  } else if (targetMatched('a[an-la="learn more click"]')) {
    fireEvent('Customer clicks View more');
  }
};
