{}/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { events } from '../../../../../lib/utils';
import settings from './shared';
import { HammerTime } from './hammer';

events.analyticsReference = '_gaUAT';

export default () => {

  const { ID, VARIATION } = settings;
  if (VARIATION == 3) {
    events.send(ID, 'SD024 Control', 'SD024 Control is active');
    return false;
  } else {
    events.send(ID, `SD024 Variation ${VARIATION}`, `SD024 Variation ${VARIATION} is active`);
  }

  setup();


  // Run Hammer
  HammerTime();

  const filterOptionWrap = document.querySelector('#innerfiltercontainer');
  const mobFilterBtn = document.querySelector('.mobSortFilter');
  const applyBtn = document.querySelector('#mobFilterControls .textIconWrap span:not(.glyphicon)');
  const clearBtn = document.querySelector('#mobclrfltrs .textIconWrap');
  const closeBtn = document.querySelector('#mobclsfltrs');

  const showLoader = (ref) => {
    if (!ref) return;
    ref.classList.add('SD-loading');
    ref.insertAdjacentHTML('beforeend', '<span class="SD-loader"></span>');

    // Then remove
    setTimeout(() => {
      const loader = document.querySelector('.SD-loader');
      if (loader) {
        loader.parentNode.removeChild(loader);
        ref.classList.remove('SD-loading');
      }
    }, 1000);
  };


  if (VARIATION == 2) {
    const filterAnchors = document.querySelectorAll('.FilterListItem a.FilterAnchor');
    if (filterAnchors) {
      for (let i = 0; filterAnchors.length > i; i += 1) {
        filterAnchors[i].addEventListener('click', () => {
          showLoader(filterOptionWrap)
        });
      }
    }
  }


  // Click outside
  const wrap = document.querySelector('.mp-scroller-inner');
  wrap ? wrap.addEventListener('click', (e) => {
    if (document.querySelector('.activeFilter')) {
      if (!filterOptionWrap.contains(e.target) && !mobSortFilter.contains(e.target)) {
        closeBtn ? closeBtn.click() : null;
      }
    }
  }) : null;
 
  // swipedetect(filterOptionWrap, (swipedir) => {
  //     // swipedir contains either "none", "left", "right", "top", or "down"
  //     if (swipedir == 'right') {
  //       closeBtn ? closeBtn.click() : null;
  //     }
  // });

  var hammertime = new Hammer(filterOptionWrap);
  
  hammertime.on('swiperight', function(ev) {
    closeBtn ? closeBtn.click() : null;
  });
  
};
