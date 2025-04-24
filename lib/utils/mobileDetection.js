/* eslint-disable import/prefer-default-export */

import MobileDetect from 'mobile-detect';

const mobileDetection = new MobileDetect(window.navigator.userAgent);

const detectMobile = mobileDetection;
const smallTablet = window.innerWidth <= 768;
export const showOnMobileAndTablet = (detectMobile.phone() || detectMobile.tablet()) && smallTablet;
export const showMobile = detectMobile.phone();
export const showDesktop = !showOnMobileAndTablet;
