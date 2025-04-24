/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

const startExperiment = () => {
  //console.log('Experiment started');

  const newSpan = `<span class="${ID}-span">New</span>`;
  const popularSpan = `<span class="${ID}-span">Popular</span>`;
  const trendingSpan = `<span class="${ID}-span">Trending</span>`;

  pollerLite(['#desktop-navigation .main-navigation a'], () => {
    //new
    // const superMilk = document.querySelector(
    //   '#desktop-navigation .main-navigation a[href*="/uk/shop/collections/chocolate/supermilk/"]'
    // );
    // superMilk.closest('li').classList.add(`${ID}-padding-style`);
    // superMilk.insertAdjacentHTML('afterend', newSpan);
    //new
    // const allChoc = document.querySelector(
    //   '#desktop-navigation .main-navigation a[href*="/uk/shop/collections/products/all-products/"]'
    // );
    // allChoc.closest('li').classList.add(`${ID}-padding-style`);
    // allChoc.insertAdjacentHTML('afterend', newSpan);
    //popular
    // const betterWay = document.querySelector(
    //   '#desktop-navigation .main-navigation a[href*="/uk/shop/collections/products/better-way-bar/"]'
    // );
    // betterWay.closest('li').classList.add(`${ID}-padding-style`);
    // betterWay.insertAdjacentHTML('afterend', popularSpan);
    //trending
    const chocGift = document.querySelector(
      '#desktop-navigation .main-navigation a[href*="/uk/shop/collections/products/chocolate-gift-sets/"]'
    );
    chocGift.closest('li').classList.add(`${ID}-padding-style`);
    chocGift.insertAdjacentHTML('afterend', trendingSpan);
    const darkChocolate = document.querySelector(
      '#desktop-navigation .main-navigation a[href*="/uk/shop/collections/chocolate/dark/"]'
    );
    darkChocolate.closest('li').classList.add(`${ID}-padding-style`);
    darkChocolate.insertAdjacentHTML('afterend', trendingSpan);
    const milkChocolate = document.querySelector(
      '#desktop-navigation .main-navigation a[href*="/uk/shop/collections/chocolate/milk/"]'
    );
    milkChocolate.closest('li').classList.add(`${ID}-padding-style`);
    milkChocolate.insertAdjacentHTML('afterend', trendingSpan);

    const chocoBox = document.querySelector(
      '#desktop-navigation .main-navigation a[href*="/uk/shop/collections/products/chocolate-box/"]'
    );
    chocoBox.closest('li').classList.add(`${ID}-padding-style`);
    chocoBox.insertAdjacentHTML('afterend', popularSpan);

    const thankYou = document.querySelector(
      '#desktop-navigation .main-navigation a[href*="/uk/shop/gift-ideas/shop-by-occasion/thank-you/"]'
    );
    thankYou.closest('li').classList.add(`${ID}-padding-style`);
    thankYou.insertAdjacentHTML('afterend', newSpan);

    const wedding = document.querySelector(
      '#desktop-navigation .main-navigation a[href*="/uk/shop/gift-ideas/shop-by-occasion/wedding/"]'
    );
    wedding.closest('li').classList.add(`${ID}-padding-style`);
    wedding.insertAdjacentHTML('afterend', trendingSpan);

    const herGift = document.querySelector(
      '#desktop-navigation .main-navigation a[href*="/uk/shop/gift-ideas/shop-by-recipient/for-her/"]'
    );
    herGift.closest('li').classList.add(`${ID}-padding-style`);
    herGift.insertAdjacentHTML('afterend', popularSpan);
  });

  pollerLite(['#main-header .main-navigation a'], () => {
    //new
    // const superMilk = document.querySelector(
    //   '#main-header .main-navigation a[href*="/uk/shop/collections/chocolate/supermilk/"]'
    // );
    // superMilk.closest('li').classList.add(`${ID}-padding-style`);
    // superMilk.insertAdjacentHTML('afterend', newSpan);
    //new
    // const allChoc = document.querySelector(
    //   '#main-header .main-navigation a[href*="/uk/shop/collections/products/all-products/"]'
    // );
    // allChoc.closest('li').classList.add(`${ID}-padding-style`);
    // allChoc.insertAdjacentHTML('afterend', newSpan);
    //popular
    // const betterWay = document.querySelector(
    //   '#main-header .main-navigation a[href*="/uk/shop/collections/products/better-way-bar/"]'
    // );
    // betterWay.closest('li').classList.add(`${ID}-padding-style`);
    // betterWay.insertAdjacentHTML('afterend', popularSpan);
    //trending
    const chocGift = document.querySelector(
      '#main-header .main-navigation a[href*="/uk/shop/collections/products/chocolate-gift-sets/"]'
    );
    chocGift.closest('li').classList.add(`${ID}-padding-style`);
    chocGift.insertAdjacentHTML('afterend', trendingSpan);

    const darkChocolate = document.querySelector('#main-header .main-navigation a[href*="/uk/shop/collections/chocolate/dark/"]');
    darkChocolate.closest('li').classList.add(`${ID}-padding-style`);
    darkChocolate.insertAdjacentHTML('afterend', trendingSpan);

    const milkChocolate = document.querySelector('#main-header .main-navigation a[href*="/uk/shop/collections/chocolate/milk/"]');
    milkChocolate.closest('li').classList.add(`${ID}-padding-style`);
    milkChocolate.insertAdjacentHTML('afterend', trendingSpan);

    const chocoBox = document.querySelector(
      '#main-header .main-navigation a[href*="/uk/shop/collections/products/chocolate-box/"]'
    );
    chocoBox.closest('li').classList.add(`${ID}-padding-style`);
    chocoBox.insertAdjacentHTML('afterend', popularSpan);

    const thankYou = document.querySelector(
      '#main-header .main-navigation a[href*="/uk/shop/gift-ideas/shop-by-occasion/thank-you/"]'
    );
    thankYou.closest('li').classList.add(`${ID}-padding-style`);
    thankYou.insertAdjacentHTML('afterend', newSpan);

    const wedding = document.querySelector(
      '#main-header .main-navigation a[href*="/uk/shop/gift-ideas/shop-by-occasion/wedding/"]'
    );
    wedding.closest('li').classList.add(`${ID}-padding-style`);
    wedding.insertAdjacentHTML('afterend', trendingSpan);

    const herGift = document.querySelector(
      '#main-header .main-navigation a[href*="/uk/shop/gift-ideas/shop-by-recipient/for-her/"]'
    );
    herGift.closest('li').classList.add(`${ID}-padding-style`);
    herGift.insertAdjacentHTML('afterend', popularSpan);
  });
};

export default () => {
  setup();

  logMessage(ID + ' Variation: ' + VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  startExperiment();
};
