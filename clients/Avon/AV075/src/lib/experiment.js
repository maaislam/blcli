/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { h, render, Component } from 'preact';
import { pollerLite } from '../../../../../lib/uc-lib';
import { viewabilityTracker } from '../../../../../lib/utils';
import DisplayComponent  from './components/DisplayComponent';
import { fireEvent } from '../../../../../core-files/services';

const addElement = () => {
  pollerLite([
    '.site-usp'
  ], () => {
    const siteUsp = document.querySelector('.site-usp');
    const wrapper = `
      <div class="${shared.ID}__wrap container-fluid">
        
      </div>
    `;
    if (siteUsp) {
      siteUsp.insertAdjacentHTML('afterend', wrapper);
      const wrap = document.querySelector(`.${shared.ID}__wrap`);
      render(<DisplayComponent/>, wrap);
      wrap ? (
        viewabilityTracker(wrap, () => {
          fireEvent('experiment seen');
        }, {
          allElementsHasToBeInView: true
        })
      ) : null;
    }
  })
}

export default () => {
  setup();
  // const { rootScope, ID } = shared;

  /** Make all changes - can be re-run on page re-render / App_LayoutChanged */
  const init = () => {
    addElement();
  };

  // Make device specific changes when layout changes
  // rootScope.$on('App_LayoutChanged', () => {
  //   setTimeout(init, 500);
  // });

  init();
};
