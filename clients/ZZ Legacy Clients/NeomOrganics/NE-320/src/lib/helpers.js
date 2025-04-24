import { fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export const showHideHeader = (topBanner) => {
  if (document.querySelector('nav.navigation.has-background-white.has-text-left-touch').classList.contains('is-visible')) {
    document.querySelector('header.header').setAttribute('style', 'display: none;');
    topBanner.setAttribute('style', 'display: none;');
  } else {
    document.querySelector('header.header').removeAttribute('style');
    topBanner.removeAttribute('style');
  }
};