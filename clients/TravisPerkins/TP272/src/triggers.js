/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const validPages = [
  '/trade-corner/benefits-of-an-account',
  '/content/create-account',
  '/content/trade-news-and-advice',
  '/content/estimating-service',
  '/content/timber-services',
  '/content/tp-direct',
  '/content/about-us',
  '/content/our-partner-sites',
];

function reRun() {
  const isHomepage = window.location.pathname === '/';
  const isDesktop = document.querySelector('[class*="AppHeaderDesktopstyled"]');
  if (isHomepage && isDesktop) {
    const bannerAttachpoint = document.querySelector('[href="/content/create-account"]');
    console.log('bannerAttachpoint', bannerAttachpoint);
    //const bannerHtml = `<div class="${ID}__promobanner"><img src="https://sb.monetate.net/img/1/581/5044558.png" alt="" /></div>`;
    if (bannerAttachpoint) {
      bannerAttachpoint.closest('div').querySelector('img').src = 'https://sb.monetate.net/img/1/581/5044558.png';
    }
    //bannerAttachpoint.insertAdjacentHTML('afterend', bannerHtml);
  }
}

if (validPages.some((page) => window.location.pathname.includes(page)) || window.location.pathname === '/') {
  // Set interval to execute the function every 1 second
  const intervalId = setInterval(reRun, 1000);

  // Clear the interval after 5 seconds (5000 milliseconds)
  setTimeout(() => {
    clearInterval(intervalId);
    console.log('Interval cleared after 5 seconds');
  }, 5000);

  pollerLite(['#bottom-account-credit'], activate);
}
