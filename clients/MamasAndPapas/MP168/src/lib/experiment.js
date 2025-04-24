/**
 * MP168 - Description
 * @author User Conversion JT
 */
import { setup } from './services';
import settings from './settings';
import { cacheDom } from '../../../../../lib/cache-dom';
import { events } from '../../../../../lib/utils';
import conf from './conf';
import badges from './badges';

const activate = () => {
  setup();

  const { ID, VARIATION } = settings;

  // Add badges to DOM ** not tested
  const addBadge = (domRef, badgesArr) => {
    if (badgesArr && domRef) {
      domRef.insertAdjacentHTML('beforeend', `
        ${badgesArr.map((badge, index) => {
          if (index == 3) return;
          return `
            <div class="MP168-badge">
              <img src="${badge}" alt="M&P Badges"/>
            </div>
          `
        }).join(' ')}
      `);
    }
  };

  const getFeatures = (confObj) => {
    const currentUrl = window.location.href;
    const prod = confObj[currentUrl];
    console.log(prod);
    if (prod && prod[0]) {
      const values = Object.values(prod[0]);
      // remove name
      const features = values.splice(1, 4);
      // remove empty values
      const arr = [];
      for(let i of features) {
        i && arr.push(i);
      }
      return arr;
    }
  };

  const featureArr = getFeatures(conf);
  
  // Map against badge icons.
  const returnBadges = (featureList, badgesObj) => {
    return featureList.map((feature) => {
      if (feature.length) {
        return badgesObj[feature];
      }
    });
  };

  const badgesToAdd = returnBadges(featureArr, badges);
  const domRefForBadges = document.querySelector('.row.mw-100.pdp__details');
  addBadge(domRefForBadges, badgesToAdd);
};

export default activate;
