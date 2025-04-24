/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import data from './data';
import personaTagger from './personaTagger';

export default () => {
  const { rootScope, ID } = shared;

  // Run log persona tagger
  const init = () => {
    const urlPath = window.location.pathname.replace(/\/$/g, '');

    const dataObject = data[urlPath];
    if(dataObject && dataObject.persona) {
      // Note that persona tagger takes care of preventing duplicate scores
      personaTagger(dataObject.persona, urlPath);
    }
  };

  // On load init
  init();

  // For async routed pages
  rootScope.$on('App_HistoryPushed', () => { 
    setTimeout(() => init(), 200);
  });
};
