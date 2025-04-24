/**
 * HSS013 - PDP content simplification
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, getSpecs } from './services';
import shared from './shared';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';
import { getCookie } from '../../../../../lib/utils';
import pdpData from './pdpData';

const { ID, VARIATION } = shared;

export default () => {
  if (shared.VARIATION == 'control') {
    events.send('CRO Experiment', `${shared.ID}`, 'Control - Activated', { sendOnce: true });
  } else {
    // rest of experiment code
    events.send('CRO Experiment', `${shared.ID}`, 'V1 - Activated', { sendOnce: true });
    setup();
    
    /**
     * @desc User had identified as TRADE
     */
    if (getCookie('homepagePreference') === 'TRADE') {
      pollerLite([
        () => {
          const features = document.querySelector(
            '#specification_tab .full_prdt_specifications .featureClass'
          );

          return features && features.children && features.children.length >= 1;
        }, 
        '.full_prdt_specifications .featureClass .feature',
        '.item_desc p.prod_summary.line-clamp',
      ], () => {

        getSpecs();
      });
    /**
     * @desc User has NOT identified
     */
    } else {
      const pathname = window.location.pathname;
      if (pathname === "/hire/p/floor-and-edge-sander-hire-pack"
      || pathname === "/hire/p/carpet-cleaner-small"
      || pathname === "/hire/p/light-vibrating-plate-flat-base"
      || pathname === "/hire/p/breaker-vibration-damped-110v"
      || pathname === "/hire/p/mitower") {
          pollerLite([
            '.item_desc p.prod_summary.line-clamp',
          ], () => {
            const productDesc = document.querySelector('.item_desc p.prod_summary.line-clamp');
            productDesc.classList.add('DIY-page');
            productDesc.classList.add('hide');
            const pageId = pathname.split('/')[3];
            const data = pdpData[`${pageId}`]
            

            if (window.innerWidth >= 1024) {
              pollerLite([
                '.item_content .item_info .item_desc',
              ], () => {
                document.querySelector('.item_desc').insertAdjacentHTML('afterbegin', data);
              });
            } else {
              pollerLite([
                '.bx-wrapper',
              ], () => {
                document.querySelector('.bx-wrapper').insertAdjacentHTML('afterend', data);
              });
            }
        });
      } else {
          pollerLite([
            () => {
              const features = document.querySelector(
                '#specification_tab .full_prdt_specifications .featureClass'
              );

              return features && features.children && features.children.length >= 1;
            }, 
            '.full_prdt_specifications .featureClass .feature',
            '.item_desc p.prod_summary.line-clamp',
          ], () => {

            getSpecs();
          });
      }

    }
    
    
  }
};
