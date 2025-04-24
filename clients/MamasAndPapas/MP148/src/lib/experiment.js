/**
 * MP148 - "View All" on Category Pages
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from './../../../../../lib/cache-dom';
import getPageType from './getPageType';
import categoryRedirects from './components/categoryPagesRedirects';
import buildRedirectLinks from './components/buildRedirectLinks';
import sendGAevents from './bindExperimentEvents/sendGAevents';

const activate = () => {

  // Experiment code
  const pathname = window.location.pathname;
  const pageType = getPageType(pathname);
  if (pageType !== '') {
    setup();
    // Build Top and Bottom redirect links
    buildRedirectLinks(categoryRedirects[pageType]);
    // Add - GA Events
    sendGAevents();
  }
  
};

export default activate;
