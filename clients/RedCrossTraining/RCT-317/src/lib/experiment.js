import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

const startExperiment = () => {



  // Poller function to wait for an element with class '.component.rich-text'
  pollerLite(['.homepage'], () => {
    const currentUrl = window.location.href;
    if (currentUrl.includes("first-aid-at-work-requalification/")) {
      document.querySelector("body > main > div.component.content-page-hero--sub > div > img").setAttribute("src", 'https://useruploads.vwo.io/useruploads/286844/images/52a93256c115437ce8f28f5526c36246_learningtohelpsomeonewithaheadinjuryonafirstaidatworkrequalificationcourse2.webp');
    } else {
      // Set a default background image if condition is not met
      document.querySelector("body > main > div.component.content-page-hero--sub > div > img").setAttribute("src", 'https://useruploads.vwo.io/useruploads/286844/images/17067e16855f1aef72a9c93b55bd82fe_learningcpronanemergencyfirstaidatworktrainingcourse.webp');
    }
  });

};

export default () => {

  setup();

  fireEvent('Conditions Met');

  if (VARIATION == 'control') {
    return;
  }

  startExperiment();
};
