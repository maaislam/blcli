import { activate, runHotjarPoll } from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { events } from '../../../../lib/utils';
import settings from './lib/settings';

events.setTrackerName('tracker2');

if(settings.VARIATION == 'control') {

  // No cookie exists
  pollerLite([
    '#noCookieDepSelect',
    '#ctl00_BottomPane [id*=DivUpcomingSlider]',
  ], () => {
    runHotjarPoll(document.querySelector('#noCookieDepSelect'), 'NH049_Control');
    runHotjarPoll(document.querySelector('#ctl00_BottomPane [id*=DivUpcomingSlider]'), 'NH049_Control');
  }, {
    multiplier: 1.5  
  });

  pollerLite([
    '#ctl00_ctl00_pnlResults',
    '[id*=HtmlHolder] + section [id*=DivUpcomingSlider]',
  ], () => {
    runHotjarPoll(document.querySelector('#ctl00_ctl00_pnlResults'), 'NH049_Control');
    runHotjarPoll(document.querySelector('[id*=HtmlHolder] + section [id*=DivUpcomingSlider]'), 'NH049_Control');
  }, {
    multiplier: 1.5  
  });

  // 

} else {
  activate();
}
