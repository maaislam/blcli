/**
 * BD011 - Mobile Navigation
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import settings from './shared';
import { events } from '../../../../../lib/utils';

export default () => {
  setup();

  const screenGroups = [
    320, 360, 375, 412, 414, 601, 768, 834, 1024, 1280, 1366, 1440, 1536, 1920, 3840, 7680
  ];

  let group = 0;
  screenGroups.forEach(w => {
    if(group == 0 && window.innerWidth <= w) {
      group = w;
    }
  });

  events.send('Layout', settings.VARIATION, group);
};
